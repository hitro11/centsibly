import {
    Component,
    computed,
    inject,
    OnDestroy,
    OnInit,
    signal,
} from '@angular/core';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { SetupAccountContainerComponent } from '../../setup-account-container/setup-account-container.component';
import { UserService } from '../../setup-account-container/services/user.service';
import {
    HlmCardDirective,
    HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { CURRENCIES } from 'utils/constants';
import { AccountInfo, AccountInfoSchema } from 'utils/schemas/schemas';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { BudgetService } from '../../setup-account-container/services/budget/budget.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { DeepPartialWithNull } from '../../shared/types';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';
import { SetupExpensesComponent } from '../../setup-account-container/setup-expenses/setup-expenses.component';
import { SetupIncomeComponent } from '../../setup-account-container/setup-income/setup-income.component';
@Component({
    selector: 'app-settings-container',
    standalone: true,
    imports: [
        BrnSeparatorComponent,
        HlmSeparatorDirective,
        SetupAccountContainerComponent,
        HlmCardDirective,
        ReactiveFormsModule,
        CommonModule,
        HlmFormFieldModule,
        SetupIncomeComponent,
        SetupExpensesComponent,
        HlmButtonDirective,
        HlmCardDirective,
        HlmCardTitleDirective,
        HlmToasterComponent,
    ],
    templateUrl: './settings-container.component.html',
    styleUrl: './settings-container.component.scss',
})
export class SettingsContainerComponent implements OnInit {
    authService = inject(AuthenticationService);
    budgetService = inject(BudgetService);
    fb = inject(FormBuilder);
    router = inject(Router);
    userService = inject(UserService);
    localStorageService = inject(LocalStorageService);

    maxIncomeLength = 10;
    currentSection = signal<number>(0);
    CURRENCIES = CURRENCIES;

    isIncomeValid = signal<boolean>(false);
    isExpensesValid = signal<boolean>(false);
    isSubmitEnabled = computed(
        () => this.isExpensesValid() && this.isIncomeValid()
    );

    accountInfo: DeepPartialWithNull<AccountInfo> = {
        currency: null,
        income: null,
        expenses: null,
    };
    originalAccountInfo?: DeepPartialWithNull<AccountInfo>;

    isSaveEnabled = computed(() => {
        return this.isIncomeValid() && this.isExpensesValid();
    });

    async ngOnInit(): Promise<void> {
        this.accountInfo = await this.userService.getAccountInfo();
        this.originalAccountInfo = { ...this.accountInfo };
    }

    async onSubmit() {
        if (
            JSON.stringify(this.accountInfo) !==
            JSON.stringify(this.originalAccountInfo)
        ) {
            await this.budgetService.onAccountSetupFormSubmit(this.accountInfo);
        }

        this.showToast();
    }

    resetSettings() {
        this.accountInfo = { ...this.originalAccountInfo };
    }

    showToast() {
        toast('Settings successfully updated', {});
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

    setIsSubmitEnabled(): boolean {
        return this.isIncomeValid() && this.isExpensesValid();
    }

    validateExpenses(data: DeepPartialWithNull<AccountInfo['expenses']>) {
        const dataObject = { expenses: data };
        return AccountInfoSchema.pick({
            expenses: true,
        }).safeParse(dataObject);
    }
}
