import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    inject,
    OnDestroy,
    OnInit,
    output,
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
import { Budget, Expense } from '@centsibly/utils/schemas';
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
export class SetupExpensesComponent
    implements OnInit, AfterViewInit, OnDestroy
{
    updateSection = output<'previous' | 'next'>();
    formData = output<DeepPartialWithNull<Budget['expenses']>>();
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

    expensesData = deepCopy(this.budgetService.accountBudget.expenses) ?? [];

    form = this.fb.group({
        expenses: this.fb.array([], [Validators.required]),
    });

    constructor() {}

    ngOnInit(): void {
        const formDraft = this.localStorageService.get(this.EXPENSE_FORM_NAME);

        if (formDraft) {
            for (const expense of formDraft) {
                this.addExpense(expense.name, expense.amount, true);
            }
        } else {
            if (!this.expensesData.length) {
                this.addExpense();
            } else {
                for (const expense of this.expensesData) {
                    this.addExpense(expense?.name, expense?.amount);
                }
            }
        }

        // required so that data is emitted to parent when loading
        // form data from localstorage
        if (this.form.valid) {
            const expenses =
                this.form.value.expenses?.map((value: any) => ({
                    name: value?.name ?? null,
                    amount: value?.amount ?? null,
                })) ?? [];

            this.formData.emit(expenses);
        }

        this.form.valueChanges
            .pipe(debounceTime(DEBOUNCE_TIME_MS), takeUntil(this.destroy$))
            .subscribe(() => {
                const isFormValid = this.form.valid;
                this.validityChanged.emit(isFormValid);

                if (isFormValid) {
                    const expenses =
                        this.form.value.expenses?.map((value: any) => ({
                            name: value?.name ?? null,
                            amount: value?.amount ?? null,
                        })) ?? [];

                    this.formData.emit(expenses);
                }
            });

        this.budgetService.saveExpenseForm
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.localStorageService.set(
                    this.EXPENSE_FORM_NAME,
                    this.form.controls['expenses'].getRawValue()
                );
            });
    }

    ngAfterViewInit(): void {
        this.validateTotalExpensesAgainstIncome();
        this.validityChanged.emit(this.form.valid);
    }

    get expensesFormControlArray() {
        return this.form.controls['expenses'] as FormArray;
    }

    addExpense(name?: string, amount?: number, onInit = false) {
        const newExpense = this.fb.group({
            name: [name, this.expenseNameValidators],
            amount: [amount, this.expenseAmountValidators],
        });

        this.expensesFormControlArray?.push(newExpense);

        // reset formgroup to prevent 'required' error from activating
        if (!onInit) {
            newExpense.markAsUntouched();
            newExpense.updateValueAndValidity();
        }
    }

    deleteExpense(index: number): void {
        this.expensesFormControlArray?.removeAt(index);
    }

    expenseNameUpdated() {
        const names: string[] = [];

        for (const control of this.expensesFormControlArray.controls) {
            const expenseName: string = control.value.name;
            const expenseNameFormControl = (control as FormGroup).controls[
                'name'
            ];

            if (names.includes(expenseName?.toLowerCase())) {
                expenseNameFormControl.setErrors({
                    duplicateName: true,
                });

                const i = names.findIndex(
                    (n) => n?.localeCompare(expenseName) === 0
                );

                (this.expensesFormControlArray.at(i) as FormGroup).controls[
                    'name'
                ].setErrors({
                    duplicateName: true,
                });
            } else {
                expenseNameFormControl.updateValueAndValidity();
                expenseNameFormControl.setErrors(expenseNameFormControl.errors);
            }

            names.push(expenseName?.toLowerCase());
        }
    }

    expenseAmountUpdated() {
        this.validateTotalExpensesAgainstIncome();
    }

    validateTotalExpensesAgainstIncome() {
        const income = this.budgetService.accountBudget.income ?? 0;
        const expenses = this.expensesFormControlArray.controls.map(
            (c) => c.value
        );

        const isExpensesExceedIncome = this.doExpensesExceedIncome(
            income,
            expenses
        );

        const errors = isExpensesExceedIncome
            ? {
                  ...this.form.errors,
                  expensesGreaterThanIncome: true,
              }
            : this.form.errors;

        this.form.setErrors(errors);
        this.form.markAllAsTouched();
    }

    doExpensesExceedIncome(
        income: Budget['income'],
        expenses: Budget['expenses']
    ): boolean {
        let totalExpenses = 0;

        for (const expense of expenses) {
            totalExpenses += expense.amount ?? 0;
        }

        return totalExpenses > income;
    }

    async updateSectionFn(direction: 'previous' | 'next') {
        try {
            if (!this.form.valid && direction === 'next') {
                return;
            }

            const expenses: Expense[] = [];

            for (let i = 0; i < this.expensesFormControlArray.length; i++) {
                const name = this.expensesFormControlArray.at(i).value
                    .name as string;
                const amount = parseInt(
                    this.expensesFormControlArray.at(i).value.amount
                );
                expenses.push({ name, amount });
            }

            this.budgetService.accountBudget.expenses = expenses;
        } catch (error) {
            console.error(error);
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
