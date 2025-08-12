import { Component, computed, inject, input, signal } from '@angular/core';
import { SetupIncomeComponent } from '../../../setup-account-container/setup-income/setup-income.component';
import { AccountInfo, AccountInfoSchema, Budget } from 'utils/schemas/schemas';
import { DeepPartialWithNull } from '../../../shared/types';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CURRENCIES } from 'utils/constants';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { BudgetService } from '../../../setup-account-container/services/budget/budget.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCardDirective } from '@spartan-ng/ui-card-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { SetupExpensesComponent } from '../../../setup-account-container/setup-expenses/setup-expenses.component';

@Component({
    selector: 'app-budget-settings',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HlmFormFieldModule,
        SetupIncomeComponent,
        SetupExpensesComponent,
        HlmButtonDirective,
        HlmCardDirective,
    ],
    templateUrl: './budget-settings.component.html',
    styleUrl: './budget-settings.component.scss',
})
export class BudgetSettingsComponent {
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

    accountBudget = this.budgetService.accountBudget;
    currency?: AccountInfo['currency'] | null | undefined;
    income?: AccountInfo['income'] | null | undefined;
    expenses?: DeepPartialWithNull<{
        expenses: AccountInfo['expenses'];
    }>;
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
                    this.accountBudget.currency = validatedData.data.currency;
                    this.accountBudget.income = validatedData.data.income;
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
                    this.accountBudget.expenses = validatedData.data.expenses;
                } else {
                    console.error(validatedData.error);
                    return;
                }

                this.onsubmit();
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

    async onsubmit() {
        this.localStorageService.delete(this.EXPENSE_FORM_NAME);
        this.localStorageService.delete(this.INCOME_FORM_NAME);
        // await this.budgetService.onAccountSetupFormSubmit();
        this.router.navigate(['/dashboard']);
    }

    onIncomeFormValidityChanged($event: boolean) {
        this.isIncomeValid.set($event);
    }

    onExpensesFormValidityChanged($event: boolean) {
        this.isExpensesValid.set($event);
    }

    onIncomeFormDataUpdated(
        formValue: DeepPartialWithNull<{
            currency: AccountInfo['currency'];
            income: AccountInfo['income'];
        }>
    ) {
        this.currency = formValue?.currency;
        this.income = formValue?.income;
    }

    onExpenseFormDataUpdated(
        expenses: DeepPartialWithNull<{
            expenses: AccountInfo['expenses'];
        }>
    ) {
        this.expenses = expenses;
    }

    validateIncome(data: DeepPartialWithNull<AccountInfo>) {
        return AccountInfoSchema.pick({
            currency: true,
            income: true,
        }).safeParse(data);
    }

    validateExpenses(
        data: DeepPartialWithNull<{
            expenses: AccountInfo['expenses'];
        }>
    ) {
        const dataObject = { expenses: data };
        return AccountInfoSchema.pick({
            expenses: true,
        }).safeParse(dataObject);
    }
}
