import { TransactionService } from './../services/transaction.service';
import {
    Component,
    inject,
    input,
    OnDestroy,
    OnInit,
    output,
    signal,
    WritableSignal,
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
import { catchError, EMPTY, of, Subject, takeUntil, tap, timer } from 'rxjs';
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
    transactionSubmitted = output<void>();
    dialogClosed = output<void>();

    fb = inject(FormBuilder);
    transactionService = inject(TransactionService);
    submissionStatus: WritableSignal<
        'none' | 'loading' | 'submitted' | 'submittedWithError'
    > = signal('none');
    private destroy$ = new Subject<void>();

    submissionError = '';
    transactionPosted = false;

    form = this.fb.group({
        type: [
            { value: 'expense', disabled: true },
            [zodValidator(TransactionSchema.shape.type)],
        ],
        category: [null, [zodValidator(TransactionSchema.shape.category)]],
        amount: [null, [zodValidator(TransactionSchema.shape.amount)]],
    });

    ngOnInit(): void {}

    toTitleCase(text: string) {
        return toTitleCase(text);
    }

    onFormFieldBlur(formControl: 'type' | 'category' | 'amount') {
        this.form.controls[formControl].updateValueAndValidity();
    }

    onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        let parsedData = null;

        try {
            const formValues = this.form.getRawValue();
            parsedData = TransactionSchema.parse(formValues);
        } catch (err) {
            this.handleValidationError(err);
            return;
        }

        this.submissionStatus.set('loading');

        this.transactionService
            .postTransactions(parsedData)
            .pipe(
                catchError((err) => {
                    this.handleSubmissionError(err);
                    return EMPTY;
                }),
                takeUntil(this.destroy$)
            )
            .subscribe((resp) => {
                if (resp) {
                    this.submissionStatus.set('submitted');
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
                        this.submissionStatus.set('none');
                    });
                }
            });
    }

    private handleValidationError(err: unknown) {
        console.error(err);
    }

    private handleSubmissionError(err: Error) {
        this.submissionStatus.set('submittedWithError');
        this.submissionError = JSON.stringify(err);
        console.error(err);
        // todo: toast notif
    }

    ngOnDestroy(): void {
        this.dialogClosed.emit();

        if (this.transactionPosted) {
            this.transactionSubmitted.emit();
        }

        this.destroy$.next();
        this.destroy$.complete();
    }
}
