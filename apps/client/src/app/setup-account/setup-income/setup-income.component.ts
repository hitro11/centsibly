import { CommonModule } from '@angular/common';
import { Component, inject, Input, output } from '@angular/core';
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
import { Currency } from 'utils/schemas/schemas';
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
export class SetupIncomeComponent {
    @Input() nextButtonClicked!: () => boolean;
    updateSection = output<'previous' | 'next'>();

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

    updateSectionFn(direction: 'previous' | 'next') {
        if (this.form.valid) {
            this.budgetService.initialBudget.currency = (this.currency?.value ??
                'CAD') as Currency;

            this.budgetService.initialBudget.income =
                this.income?.value ?? undefined;
        }

        this.updateSection.emit(direction);
    }

    get currency() {
        return this.form.get('currency');
    }

    get income() {
        return this.form.get('income');
    }
}
