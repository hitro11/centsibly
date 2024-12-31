import { TransactionService } from './../services/transaction.service';
import {
    Component,
    inject,
    input,
    OnDestroy,
    OnInit,
    output,
} from '@angular/core';
import { Expense } from 'utils/schemas/schemas';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { toTitleCase } from '../../shared/utils';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
    HlmAlertDirective,
    HlmAlertIconDirective,
    HlmAlertTitleDirective,
} from '@spartan-ng/ui-alert-helm';
import { zodValidator } from '../../shared/validators';
import { TransactionSchema } from '@centsibly/utils/schemas';
import { provideIcons } from '@ng-icons/core';
import { lucideCheckCircle } from '@ng-icons/lucide';
import { timer } from 'rxjs';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';

@Component({
    selector: 'app-add-transaction',
    standalone: true,
    providers: [provideIcons({ lucideCheckCircle })],
    imports: [
        BrnSelectImports,
        HlmSelectImports,
        HlmInputDirective,
        HlmFormFieldModule,
        HlmButtonDirective,
        ReactiveFormsModule,
        CommonModule,
        HlmAlertDirective,
        HlmSpinnerComponent,
    ],
    templateUrl: './add-transaction.component.html',
    styleUrl: './add-transaction.component.scss',
})
export class AddTransactionComponent implements OnInit, OnDestroy {
    expenses = input.required<Expense[]>();
    transactionPostedEvent = output<void>();

    fb = inject(FormBuilder);
    transactionService = inject(TransactionService);
    submissionStatus: 'none' | 'loading' | 'submitted' | 'submittedWithError' =
        'none';
    submissionError = '';
    transactionPosted = false;

    ngOnInit(): void {}

    form = this.fb.group({
        type: [
            { value: 'expense', disabled: true },
            [zodValidator(TransactionSchema.shape.type)],
        ],
        category: [null, [zodValidator(TransactionSchema.shape.category)]],
        amount: [null, [zodValidator(TransactionSchema.shape.amount)]],
    });

    toTitleCase(text: string) {
        return toTitleCase(text);
    }

    onFormFieldBlur(formControl: 'type' | 'category' | 'amount') {
        this.form.controls[formControl].updateValueAndValidity();
    }

    async onSubmit(): Promise<void> {
        try {
            const formValues = this.form.getRawValue();
            const result = TransactionSchema.safeParse(formValues);

            if (!result.success) {
                console.error('input not valid: ', result.error);
                return;
            } else if (result.success) {
                this.submissionStatus = 'loading';
                await this.transactionService.postTransactions(result.data);
                this.submissionStatus = 'submitted';
                this.transactionPosted = true;

                this.form.reset(
                    {
                        type: 'expense',
                        category: null,
                        amount: null,
                    },
                    {
                        emitEvent: true,
                        onlySelf: true,
                    }
                );

                this.form.controls['category'].setErrors(null);
                this.form.controls['amount'].setErrors(null);

                timer(2000).subscribe(() => {
                    this.submissionStatus = 'none';
                });
            }
        } catch (error) {
            this.submissionStatus = 'submittedWithError';
            this.submissionError = JSON.stringify(error);
            console.error(error);
        }
    }

    ngOnDestroy(): void {
        if (this.transactionPosted) {
            this.transactionPostedEvent.emit();
        }
    }
}
