import { firstValueFrom, Subject } from 'rxjs';
import { inject, Injectable, signal } from '@angular/core';
import {
    Budget,
    AccountInfo,
    AccountInfoSchema,
    BudgetSchema,
    HTTPresponse,
} from '@centsibly/utils/schemas';
import { getCurrentYearMonth } from '@centsibly/utils/utils';
import { DeepPartial } from '../../../shared/types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { UserService } from '../user.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class BudgetService {
    httpClient = inject(HttpClient);
    userService = inject(UserService);
    localStorageService = inject(LocalStorageService);

    // todo: possibly make this a signal?
    initialBudget: DeepPartial<Budget> = {
        currency: 'CAD',
    };

    accountBudget: DeepPartial<AccountInfo> = {
        currency: 'CAD',
    };

    saveIncomeForm = new Subject<void>();
    saveExpenseForm = new Subject<void>();

    INCOME_FORM_NAME = 'incomeForm';
    EXPENSE_FORM_NAME = 'expenseForm';

    constructor() {}

    async onAccountSetupFormSubmit(): Promise<void> {
        try {
            const data = this.accountBudget;
            data.email = this.userService.email();
            const parsedData = AccountInfoSchema.parse(data);
            await this.updateAccountBudgetInfo(parsedData);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    saveFormToLocalStorage(form: 'income' | 'expense') {
        if (form === 'income') {
            this.saveIncomeForm.next();
        } else {
            this.saveExpenseForm.next();
        }
    }

    async updateAccountBudgetInfo(body: AccountInfo): Promise<unknown> {
        try {
            return firstValueFrom(
                this.httpClient.post(
                    `${environment.API_URL}/user/account`,
                    body
                )
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async addBudget(body: unknown): Promise<unknown> {
        try {
            return firstValueFrom(
                this.httpClient.post(`${environment.API_URL}/budgets`, body)
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getCurrentBudget(): Promise<Budget | null> {
        try {
            const resp = await firstValueFrom(
                this.httpClient.get<HTTPresponse>(
                    `${environment.API_URL}/budgets?current=true`
                )
            );

            const budget = (resp.data as Budget[])[0];
            return budget ?? null;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
