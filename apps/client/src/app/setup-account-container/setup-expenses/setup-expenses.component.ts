import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    inject,
    input,
    OnDestroy,
    OnInit,
    OnChanges,
    output,
    SimpleChanges,
} from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { provideIcons } from '@ng-icons/core';
import {
    lucideTrash2,
    lucidePlusCircle,
    lucideAlertTriangle,
} from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { deepCopy } from '../../shared/utils';
import {
    AMOUNT_REGEX,
    DEBOUNCE_TIME_MS,
    MAX_NUMBER_VALUE,
    STRING_REGEX,
} from '@centsibly/utils/constants';
import {
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
} from '@spartan-ng/ui-card-helm';
import { ThemeService } from '../../shared/services/theme.service';
import { AccountInfo, Expense } from '@centsibly/utils/schemas';
import {
    HlmAlertDirective,
    HlmAlertDescriptionDirective,
    HlmAlertIconDirective,
    HlmAlertTitleDirective,
} from '@spartan-ng/ui-alert-helm';
import { BudgetService } from '../services/budget/budget.service';
import { Router } from '@angular/router';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { DeepPartialWithNull } from '../../shared/types';

@Component({
    selector: 'app-setup-expenses',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HlmFormFieldModule,
        HlmInputDirective,
        BrnSelectImports,
        HlmSelectImports,
        HlmIconComponent,
        HlmButtonDirective,
        HlmCardContentDirective,
        HlmCardDescriptionDirective,
        HlmCardDirective,
        HlmAlertDirective,
        HlmAlertDescriptionDirective,
        HlmAlertIconDirective,
        HlmAlertTitleDirective,
    ],
    providers: [
        provideIcons({ lucideTrash2, lucidePlusCircle, lucideAlertTriangle }),
    ],
    templateUrl: './setup-expenses.component.html',
    styleUrl: './setup-expenses.component.scss',
})
export class SetupExpensesComponent implements OnInit, OnChanges, OnDestroy {
    inputData = input<
        DeepPartialWithNull<{
            expenses: AccountInfo['expenses'];
            income: AccountInfo['income'];
        }>
    >();

    outputtedFormData = output<
        DeepPartialWithNull<{
            expenses: AccountInfo['expenses'];
        }>
    >();

    validityChanged = output<boolean>();

    fb = inject(FormBuilder);
    budgetService = inject(BudgetService);
    themeService = inject(ThemeService);
    localStorageService = inject(LocalStorageService);
    router = inject(Router);
    changeDetectorRef = inject(ChangeDetectorRef);
    private destroy$ = new Subject<void>();
    maxCharacterLimit = 25;
    theme = this.themeService.theme;
    EXPENSE_FORM_NAME = this.budgetService.EXPENSE_FORM_NAME;

    expenseNameValidators = [
        Validators.required,
        Validators.maxLength(this.maxCharacterLimit),
        Validators.pattern(STRING_REGEX),
    ];
    expenseAmountValidators = [
        Validators.required,
        Validators.max(MAX_NUMBER_VALUE),
        Validators.min(1),
        Validators.pattern(AMOUNT_REGEX),
    ];

    form = this.fb.group({
        expenses: this.fb.array(
            [],
            [
                Validators.required,
                this.duplicateNameValidator(),
                this.totalExpensesGreaterThanIncomeValidator(),
            ]
        ),
    });

    constructor() {}

    ngOnInit(): void {
        this.form.valueChanges
            .pipe(debounceTime(DEBOUNCE_TIME_MS), takeUntil(this.destroy$))
            .subscribe(() => {
                const isFormValid = this.form.valid;
                this.validityChanged.emit(isFormValid);

                const expenses = this.generateOutputObject(
                    this.form.value.expenses
                );
                this.outputtedFormData.emit(expenses);
            });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['inputData']?.currentValue) {
            while (this.expensesFormControlArray.length > 0) {
                this.expensesFormControlArray.removeAt(0);
            }

            setTimeout(() => {
                if (!this.inputData()?.expenses?.length) {
                    this.addExpense();
                } else {
                    for (const expense of this.inputData()?.expenses ?? []) {
                        this.addExpense(
                            expense?.name ?? '',
                            expense?.amount ?? 0
                        );
                    }
                }

                this.validityChanged.emit(this.form.valid);
            }, 0);
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    get expensesFormControlArray() {
        return this.form.controls['expenses'] as FormArray;
    }

    generateOutputObject(expenses: unknown[] | undefined): DeepPartialWithNull<{
        expenses: AccountInfo['expenses'];
    }> {
        if (!expenses) {
            return { expenses: [] };
        }

        const expensesObj = expenses?.map((value: any) => {
            return {
                name: value?.name ?? null,
                amount: value?.amount ?? null,
            };
        });

        return { expenses: expensesObj };
    }

    addExpense(name?: string, amount?: number) {
        const newExpense = this.fb.group({
            name: [name, this.expenseNameValidators],
            amount: [amount, this.expenseAmountValidators],
        });

        this.expensesFormControlArray?.push(newExpense);

        // reset formgroup to prevent 'required' error from activating
        newExpense.markAsUntouched();
        newExpense.updateValueAndValidity();
    }

    deleteExpense(index: number): void {
        this.expensesFormControlArray?.removeAt(index);
    }

    doExpensesExceedIncome(
        income: AccountInfo['income'],
        expenses: AccountInfo['expenses']
    ): boolean {
        let totalExpenses = 0;

        for (const expense of expenses) {
            totalExpenses += expense.amount ?? 0;
        }

        return totalExpenses > income;
    }

    // custom validators
    duplicateNameValidator(): ValidatorFn {
        return (formArray: AbstractControl): ValidationErrors | null => {
            if (!(formArray instanceof FormArray)) return null;

            const names = new Set<string>();
            const duplicates = new Set<string>();

            // Find duplicates
            formArray.controls.forEach((control) => {
                const name = control.get('name')?.value?.toLowerCase();
                if (name) {
                    if (names.has(name)) {
                        duplicates.add(name);
                    } else {
                        names.add(name);
                    }
                }
            });

            // Set errors on individual controls
            formArray.controls.forEach((control) => {
                const nameControl = control.get('name');
                const name = nameControl?.value?.toLowerCase();

                if (name && duplicates.has(name)) {
                    nameControl?.setErrors({
                        ...nameControl.errors,
                        duplicateName: true,
                    });
                } else if (nameControl?.errors?.['duplicateName']) {
                    delete nameControl.errors['duplicateName'];
                    const hasOtherErrors =
                        Object.keys(nameControl.errors).length > 0;
                    nameControl.setErrors(
                        hasOtherErrors ? nameControl.errors : null
                    );
                }
            });

            return null;
        };
    }

    totalExpensesGreaterThanIncomeValidator(): ValidatorFn {
        return (formArray: AbstractControl): ValidationErrors | null => {
            if (!(formArray instanceof FormArray)) return null;

            const expenses = formArray.controls.map((c) => c.value);
            const income = this.inputData()?.income ?? 0;

            if (this.doExpensesExceedIncome(income, expenses)) {
                return { expensesGreaterThanIncome: true };
            }

            return null;
        };
    }
}
