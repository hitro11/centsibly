import { Component, inject, input } from '@angular/core';
import { Expense } from 'utils/schemas/schemas';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { toTitleCase } from '../../shared/utils';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { CommonModule } from '@angular/common';
import {
    AbstractControl,
    FormBuilder,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { AMOUNT_REGEX } from '@centsibly/utils/constants';
import { MAX_NUMBER_VALUE } from '@centsibly/utils/constants';
import { zodValidator } from '../../shared/validators';
import { TransactionSchema } from '@centsibly/utils/schemas';
@Component({
    selector: 'app-add-transaction',
    standalone: true,
    imports: [
        BrnSelectImports,
        HlmSelectImports,
        HlmInputDirective,
        HlmFormFieldModule,
        HlmButtonDirective,
        ReactiveFormsModule,
        CommonModule,
    ],
    templateUrl: './add-transaction.component.html',
    styleUrl: './add-transaction.component.scss',
})
export class AddTransactionComponent {
    expenses = input.required<Expense[]>();
    fb = inject(FormBuilder);

    form = this.fb.group({
        type: [
            { value: 'expense', disabled: true },
            [Validators.required, zodValidator(TransactionSchema.shape.type)],
        ],
        category: [
            null,
            [
                Validators.required,
                zodValidator(TransactionSchema.shape.category),
            ],
        ],
        amount: [
            null,
            [Validators.required, zodValidator(TransactionSchema.shape.amount)],
        ],
    });

    toTitleCase(text: string) {
        return toTitleCase(text);
    }

    onSubmit() {}

    expenseAmountValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            return value
                ? null
                : {
                      amountTooHigh:
                          'Expense amount cannot be greater than the total allocation for the expense type',
                  };
        };
    }
}
