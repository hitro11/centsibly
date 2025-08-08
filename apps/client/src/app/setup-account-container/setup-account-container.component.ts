import { CURRENCIES } from '@centsibly/utils/constants';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { AuthenticationService } from '../auth/services/authentication.service';
import { Router } from '@angular/router';
import { SetupIncomeComponent } from './setup-income/setup-income.component';
import { SetupExpensesComponent } from './setup-expenses/setup-expenses.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { Budget } from 'utils/schemas/schemas';
import { BudgetService } from './services/budget/budget.service';

@Component({
    selector: 'app-setup-account-container',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HlmFormFieldModule,
        SetupIncomeComponent,
        SetupExpensesComponent,
        HlmButtonDirective,
    ],
    templateUrl: './setup-account-container.component.html',
    styleUrl: './setup-account-container.component.scss',
})
export class SetupAccountContainerComponent implements OnInit {
    authService = inject(AuthenticationService);
    budgetService = inject(BudgetService);
    fb = inject(FormBuilder);
    router = inject(Router);
    maxIncomeLength = 10;
    currentSection = signal<number>(0);
    CURRENCIES = CURRENCIES;

    isIncomeValid = signal<boolean>(false);
    isExpensesValid = signal<boolean>(false);

    isGoNextEnabled = computed(() => {
        switch (this.currentSection()) {
            case 0:
                return true;

            case 1:
                return this.isIncomeValid();

            case 2:
                return this.isExpensesValid();

            default:
                return false;
        }
    });

    async ngOnInit(): Promise<void> {}

    goNext() {
        switch (this.currentSection()) {
            case 0:
                this.currentSection.update((v) => v + 1);
                break;

            case 1:
                this.currentSection.update((v) => v + 1);
                break;

            case 2:
                break;

            default:
                break;
        }
    }

    goBack() {
        if (this.currentSection() < 1) {
            return;
        }
        this.currentSection.update((v) => v - 1);
    }

    onIncomeFormValidityChanged($event: boolean) {
        this.isIncomeValid.set($event);
    }

    onExpensesFormValidityChanged($event: boolean) {
        this.isExpensesValid.set($event);
    }

    onIncomeFormDataUpdated(formValues: {
        currency: Budget['currency'];
        income: Budget['income'];
    }) {
        this.budgetService.initialBudget.currency = formValues.currency;
        this.budgetService.initialBudget.income = formValues.income;
    }

    async onSubmit() {}
}
