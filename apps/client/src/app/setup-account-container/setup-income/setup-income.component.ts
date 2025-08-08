import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { REQUIRED_ERROR_MESSAGE } from '../../shared/constants';

import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { lucideDollarSign, lucideInfo } from '@ng-icons/lucide';
import {
    MAX_NUMBER_VALUE,
    AMOUNT_REGEX,
    CURRENCIES,
} from '@centsibly/utils/constants';
import { Budget, Currency } from 'utils/schemas/schemas';
import { BudgetService } from '../services/budget/budget.service';
import {
    BrnPopoverComponent,
    BrnPopoverContentDirective,
    BrnPopoverTriggerDirective,
} from '@spartan-ng/ui-popover-brain';
import {
    HlmPopoverCloseDirective,
    HlmPopoverContentDirective,
} from '@spartan-ng/ui-popover-helm';
import { debounceTime, filter, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-setup-income',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HlmFormFieldModule,
        HlmInputDirective,
        BrnSelectImports,
        HlmSelectImports,
        HlmButtonDirective,
        BrnPopoverComponent,
        BrnPopoverContentDirective,
        BrnPopoverTriggerDirective,
        HlmPopoverCloseDirective,
        HlmPopoverContentDirective,
        HlmIconComponent,
    ],
    providers: [provideIcons({ lucideDollarSign, lucideInfo })],
    templateUrl: './setup-income.component.html',
    styleUrl: './setup-income.component.scss',
})
export class SetupIncomeComponent implements OnInit, OnDestroy {
    formData = output<{
        currency: Budget['currency'];
        income: Budget['income'];
    }>();
    validityChanged = output<boolean>();

    private destroy$ = new Subject<void>();
    fb = inject(FormBuilder);
    budgetService = inject(BudgetService);
    CURRENCIES = CURRENCIES;
    REQUIRED_ERROR_MESSAGE = REQUIRED_ERROR_MESSAGE;

    form = this.fb.group({
        currency: [
            this.budgetService.initialBudget.currency,
            [Validators.required],
        ],
        income: [
            this.budgetService.initialBudget.income,
            [
                Validators.required,
                Validators.max(MAX_NUMBER_VALUE),
                Validators.min(1),
                Validators.pattern(AMOUNT_REGEX),
            ],
        ],
    });

    constructor() {}

    ngOnInit(): void {
        this.validityChanged.emit(this.form.valid);

        this.form.valueChanges
            .pipe(debounceTime(300), takeUntil(this.destroy$))
            .subscribe(() => {
                const isFormValid = this.form.valid;
                const value = this.form.value;

                this.validityChanged.emit(isFormValid);

                if (isFormValid && value.currency && value.income) {
                    this.formData.emit({
                        currency: value.currency,
                        income: value.income,
                    });
                }
            });
    }

    get currencyFormControl() {
        return this.form.get('currency');
    }

    get incomeFormControl() {
        return this.form.get('income');
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
