import { Component, inject, input } from '@angular/core';
import { Expense } from 'utils/schemas/schemas';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { toTitleCase } from '../../shared/utils';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AMOUNT_REGEX } from '@centsibly/utils/constants';
import { MAX_NUMBER_VALUE } from '@centsibly/utils/constants';

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
        type: ['expense', Validators.required],
        category: [null, Validators.required],
        amount: [
            null,
            [
                Validators.required,
                Validators.max(MAX_NUMBER_VALUE),
                Validators.min(1),
                Validators.pattern(AMOUNT_REGEX),
            ],
        ],
    });

    toTitleCase(text: string) {
        return toTitleCase(text);
    }

    onSubmit() {
        console.log('valid: ' + this.form.valid);
    }
}
