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
    DEBOUNCE_TIME_MS,
} from '@centsibly/utils/constants';
import { AccountInfo, Currency } from 'utils/schemas/schemas';
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
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { DeepPartial, DeepPartialWithNull } from '../../shared/types';

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
        BrnPopoverComponent,
        BrnPopoverContentDirective,
        BrnPopoverTriggerDirective,
        HlmPopoverContentDirective,
        HlmIconComponent,
    ],
    providers: [provideIcons({ lucideDollarSign, lucideInfo })],
    templateUrl: './setup-income.component.html',
    styleUrl: './setup-income.component.scss',
})
export class SetupIncomeComponent implements OnInit, OnDestroy {
    formData = output<
        DeepPartialWithNull<{
            currency: AccountInfo['currency'];
            income: AccountInfo['income'];
        }>
    >();

    validityChanged = output<boolean>();

    private destroy$ = new Subject<void>();
    fb = inject(FormBuilder);
    budgetService = inject(BudgetService);
    localStorageService = inject(LocalStorageService);
    CURRENCIES = CURRENCIES;
    REQUIRED_ERROR_MESSAGE = REQUIRED_ERROR_MESSAGE;
    INCOME_FORM_NAME = this.budgetService.INCOME_FORM_NAME;

    form = this.fb.group({
        currency: [
            this.budgetService.accountBudget.currency,
            [Validators.required],
        ],
        income: [
            this.budgetService.accountBudget.income,
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
        const formDraft = this.localStorageService.get(this.INCOME_FORM_NAME);
        if (formDraft) {
            console.log('restoring income form from from LS:', formDraft);
            this.form.setValue(formDraft);
        }

        this.validityChanged.emit(this.form.valid);
        this.formData.emit(this.form.value);

        this.form.valueChanges
            .pipe(debounceTime(DEBOUNCE_TIME_MS), takeUntil(this.destroy$))
            .subscribe(() => {
                const isFormValid = this.form.valid;
                this.validityChanged.emit(isFormValid);

                if (isFormValid) {
                    this.formData.emit(this.form.value);
                }
            });

        this.budgetService.saveIncomeForm
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                console.log('saving income form');
                console.log(this.form.getRawValue());

                this.localStorageService.set(
                    this.INCOME_FORM_NAME,
                    this.form.getRawValue()
                );
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
