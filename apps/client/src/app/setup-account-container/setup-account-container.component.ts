import { CURRENCIES } from '@centsibly/utils/constants';
import { CommonModule } from '@angular/common';
import {
    Component,
    computed,
    EventEmitter,
    inject,
    OnInit,
    signal,
    ViewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { AuthenticationService } from '../auth/services/authentication.service';
import { Router } from '@angular/router';
import { SetupIncomeComponent } from './setup-income/setup-income.component';
import { SetupExpensesComponent } from './setup-expenses/setup-expenses.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { AccountInfo, AccountInfoSchema } from 'utils/schemas/schemas';
import { BudgetService } from './services/budget/budget.service';
import { DeepPartialWithNull } from '../shared/types';
import { LocalStorageService } from '../shared/services/local-storage.service';
import {
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
} from '@spartan-ng/ui-card-helm';

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
        HlmCardDirective,
        HlmCardContentDirective,
        HlmCardDescriptionDirective,
    ],
    templateUrl: './setup-account-container.component.html',
    styleUrl: './setup-account-container.component.scss',
})
export class SetupAccountContainerComponent implements OnInit {
    @ViewChild(SetupExpensesComponent)
    expensesComponent!: SetupExpensesComponent;
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

    accountInfo: DeepPartialWithNull<AccountInfo> = {
        currency: null,
        income: null,
        expenses: null,
    };

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
                    currency: this.accountInfo.currency,
                    income: this.accountInfo.income,
                });

                if (validatedData.success) {
                    this.accountInfo.currency = validatedData.data.currency;
                    this.accountInfo.income = validatedData.data.income;
                } else {
                    return;
                }

                this.currentSection.update((v) => v + 1);
                break;
            }

            case 2: {
                const x = this.expensesComponent.sendDataToParent();
                console.log(x);

                if (!this.accountInfo.expenses) {
                    return;
                }

                const validatedData = this.validateExpenses(
                    this.accountInfo.expenses
                );

                if (validatedData.success) {
                    this.accountInfo.expenses = validatedData.data.expenses;
                } else {
                    console.error(validatedData.error);
                    return;
                }

                this.onSubmit();
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
                break;
            }

            case 2: {
                break;
            }

            default:
                break;
        }

        this.currentSection.update((v) => v - 1);
    }

    onSubmit() {
        this.budgetService
            .onAccountSetupFormSubmit(this.accountInfo)
            .subscribe(() => {
                this.router.navigate(['/dashboard']);
            });
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
        this.accountInfo.currency = formValue?.currency;
        this.accountInfo.income = formValue?.income;
    }

    onExpenseFormDataUpdated(
        data: DeepPartialWithNull<{
            expenses: AccountInfo['expenses'];
        }>
    ) {
        this.accountInfo.expenses = data.expenses;
    }

    validateIncome(
        data: DeepPartialWithNull<{
            currency: AccountInfo['currency'];
            income: AccountInfo['income'];
        }>
    ) {
        return AccountInfoSchema.pick({
            currency: true,
            income: true,
        }).safeParse(data);
    }

    validateExpenses(data: DeepPartialWithNull<AccountInfo['expenses']>) {
        const dataObject = { expenses: data };
        return AccountInfoSchema.pick({
            expenses: true,
        }).safeParse(dataObject);
    }
}
