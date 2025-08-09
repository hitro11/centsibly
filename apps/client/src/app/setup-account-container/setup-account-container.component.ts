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
import { Budget, BudgetSchema } from 'utils/schemas/schemas';
import { BudgetService } from './services/budget/budget.service';
import { DeepPartial, DeepPartialWithNull } from '../shared/types';
import { LocalStorageService } from '../shared/services/local-storage.service';

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
    localStorageService = inject(LocalStorageService);

    maxIncomeLength = 10;
    currentSection = signal<number>(0);
    CURRENCIES = CURRENCIES;

    isIncomeValid = signal<boolean>(false);
    isExpensesValid = signal<boolean>(false);

    initialBudget = this.budgetService.initialBudget;
    currency?: Budget['currency'] | null | undefined;
    income?: Budget['income'] | null | undefined;
    expenses?: DeepPartialWithNull<Budget['expenses']>;
    INCOME_FORM_NAME = this.budgetService.INCOME_FORM_NAME;
    EXPENSE_FORM_NAME = this.budgetService.EXPENSE_FORM_NAME;

    isNextEnabled = computed(() => {
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

    onNextClick() {
        this.goNext();
    }

    goNext() {
        switch (this.currentSection()) {
            case 0:
                this.currentSection.update((v) => v + 1);
                break;

            case 1: {
                const validatedData = this.validateIncome({
                    currency: this.currency,
                    income: this.income,
                });

                if (validatedData.success) {
                    this.initialBudget.currency = validatedData.data.currency;
                    this.initialBudget.income = validatedData.data.income;
                    this.currentSection.update((v) => v++);
                } else {
                    console.error(validatedData.error);
                    return;
                }

                this.localStorageService.delete(this.INCOME_FORM_NAME);
                this.currentSection.update((v) => v + 1);
                break;
            }

            case 2: {
                if (!this.expenses) {
                    return;
                }

                const validatedData = this.validateExpenses(this.expenses);

                if (validatedData.success) {
                    this.initialBudget.expenses = validatedData.data.expenses;
                } else {
                    console.error(validatedData.error);
                    return;
                }

                this.localStorageService.delete(this.EXPENSE_FORM_NAME);
                this.budgetService.onSetupFormSubmit();
                break;
            }

            default:
                break;
        }
    }

    goBack() {
        if (this.currentSection() === 0) {
            return;
        }

        switch (this.currentSection()) {
            case 1: {
                this.budgetService.saveFormToLocalStorage('income');
                break;
            }

            case 2: {
                this.budgetService.saveFormToLocalStorage('expense');
                break;
            }

            default:
                break;
        }

        this.currentSection.update((v) => v - 1);
    }

    onIncomeFormValidityChanged($event: boolean) {
        this.isIncomeValid.set($event);
    }

    onExpensesFormValidityChanged($event: boolean) {
        this.isExpensesValid.set($event);
    }

    onIncomeFormDataUpdated(
        formValue: DeepPartialWithNull<{
            currency: Budget['currency'];
            income: Budget['income'];
        }>
    ) {
        this.currency = formValue?.currency;
        this.income = formValue?.income;
    }

    onExpenseFormDataUpdated(
        expenses: DeepPartialWithNull<Budget['expenses']>
    ) {
        this.expenses = expenses;
    }

    validateIncome(data: DeepPartialWithNull<Budget>) {
        return BudgetSchema.pick({
            currency: true,
            income: true,
        }).safeParse(data);
    }

    validateExpenses(data: DeepPartialWithNull<Budget['expenses']>) {
        const dataObject = { expenses: data };
        return BudgetSchema.pick({
            expenses: true,
        }).safeParse(dataObject);
    }
}
