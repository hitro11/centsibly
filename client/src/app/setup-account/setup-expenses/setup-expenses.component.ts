import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
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
    lucideBadgePlus,
    lucideTrash2,
    lucidePlusCircle,
} from '@ng-icons/lucide';
import { MAX_NUMBER_VALUE } from '../../shared/constants';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { SetupAccountService } from '../services/setup-account.service';
import { deepCopy } from '../../shared/utils';
import { Expense } from '../../shared/types';

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
    ],
    providers: [provideIcons({ lucideTrash2, lucidePlusCircle })],
    templateUrl: './setup-expenses.component.html',
    styleUrl: './setup-expenses.component.scss',
})
export class SetupExpensesComponent {
    updateSection = output<'previous' | 'next'>();

    fb = inject(FormBuilder);
    Object = Object;
    setupAccountService = inject(SetupAccountService);
    maxCharacterLimit = 25;

    expenseNameValidators = [
        Validators.required,
        Validators.maxLength(this.maxCharacterLimit),
        Validators.pattern(/^[a-zA-Z0-9\s\(\)\-_]+$/),
    ];
    expenseAmountValidators = [
        Validators.max(MAX_NUMBER_VALUE),
        Validators.min(0.01),
        Validators.pattern(/^\d+(\.\d{1,})?$/),
    ];

    // expenses = deepCopy(this.setupAccountService.data.expenses);

    form = this.fb.group({ expenses: this.fb.array([]) });

    constructor() {
        this.addExpense();
        console.log(this.expenses.at(0).value);
    }

    get expenses() {
        return this.form.controls['expenses'] as FormArray;
    }

    addExpense() {
        this.expenses?.push(
            this.fb.group({
                name: ['housing', this.expenseNameValidators],
                amount: [0, this.expenseAmountValidators],
            })
        );
    }

    deleteExpense(index: number): void {
        this.expenses?.removeAt(index);
    }

    updateSectionFn(direction: 'previous' | 'next') {
        if (direction === 'next') {
            const expenses: Partial<Record<Expense, number>> = {};

            for (const key of Object.keys(this.expenses.controls)) {
                // expenses[key as Expense] = this.form.controls[key].value;
            }

            // this.setupAccountService.data.expenses = expenses;
            console.log(this.setupAccountService.data);
        }

        this.updateSection.emit(direction);
    }
}
