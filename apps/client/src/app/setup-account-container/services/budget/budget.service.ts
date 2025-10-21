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

    onAccountSetupFormSubmit(data: DeepPartialWithNull<AccountInfo>) {
        data.email = this.userService.email();
        const parsedData = AccountInfoSchema.parse(data);
        return this.updateAccountBudgetInfo(parsedData);
    }

    updateAccountBudgetInfo(body: AccountInfo) {
        return this.httpClient.post(
            `${environment.API_URL}/user/account`,
            body
        );
    }

    getCurrentBudget(): Observable<Budget | null> {
        return this.currentBudgetSubject$.pipe(
            startWith(void 0),
            switchMap(() => {
                return this.httpClient
                    .get<BudgetHttpResponse>(
                        `${environment.API_URL}/budgets/current`
                    )
                    .pipe(map((resp) => resp.data as Budget | null));
            }),
            shareReplay(1)
        );
    }

    refreshCurrentBudget() {
        this.currentBudgetSubject$.next();
    }

    createBudget(yearMonth: YearMonth): Observable<Budget | null> {
        return this.httpClient
            .post<BudgetHttpResponse>(`${environment.API_URL}/budgets`, {
                yearMonth,
            })
            .pipe(map((resp) => resp.data as Budget | null));
    }

    async hasUserCompletedSetup(): Promise<boolean> {
        const userBudget = await firstValueFrom(this.getCurrentBudget());
        return userBudget?.income ? true : false;
    }
}
