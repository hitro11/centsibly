import {
    firstValueFrom,
    map,
    Observable,
    shareReplay,
    startWith,
    Subject,
    switchMap,
} from 'rxjs';
import { inject, Injectable } from '@angular/core';
import {
    Budget,
    AccountInfo,
    AccountInfoSchema,
    YearMonth,
} from '@centsibly/utils/schemas';
import {} from '@centsibly/utils/utils';
import { DeepPartial, DeepPartialWithNull } from '../../../shared/types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { UserService } from '../user.service';
import { BudgetHttpResponse } from 'utils/utils/httpTypes';

@Injectable({
    providedIn: 'root',
})
export class BudgetService {
    private httpClient = inject(HttpClient);
    private userService = inject(UserService);

    private currentBudgetSubject$ = new Subject<void>();

    accountBudget: DeepPartial<AccountInfo> = {
        currency: 'CAD',
    };

    INCOME_FORM_NAME = 'incomeForm';
    EXPENSE_FORM_NAME = 'expenseForm';

    constructor() {}

    async onAccountSetupFormSubmit(
        data: DeepPartialWithNull<AccountInfo>
    ): Promise<void> {
        try {
            data.email = this.userService.email();
            const parsedData = AccountInfoSchema.parse(data);
            await this.updateAccountBudgetInfo(parsedData);
        } catch (error) {
            console.error(error);
            throw error;
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

    getCurrentBudget(): Observable<Budget | null> {
        return this.currentBudgetSubject$.pipe(
            startWith(void 0),
            switchMap(() =>
                this.httpClient
                    .get<BudgetHttpResponse>(
                        `${environment.API_URL}/budgets/current`
                    )
                    .pipe(map((resp) => resp.data as Budget | null))
            ),
            shareReplay({ bufferSize: 1, refCount: true })
        );
    }

    refreshCurrentBudget() {
        this.currentBudgetSubject$.next();
    }

    async createBudgetForCurrentMonth(yearMonth: YearMonth) {
        const resp = await firstValueFrom(
            this.httpClient.post<Budget>(`${environment.API_URL}/budgets`, {
                yearMonth,
            })
        );

        return resp;
    }
}
