import { firstValueFrom } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { Budget, BudgetSchema, HTTPresponse } from '@centsibly/utils/schemas';
import { getCurrentYearMonth } from '@centsibly/utils/utils';
import { DeepPartial } from '../../../shared/types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class BudgetService {
    httpClient = inject(HttpClient);

    initialBudget: DeepPartial<Budget> = {
        currency: 'CAD',
    };

    constructor() {}

    async onSetupFormSubmit(): Promise<void> {
        try {
            const data = this.initialBudget;
            data.month = getCurrentYearMonth();
            BudgetSchema.parse(data);
            await this.addBudget(data);
        } catch (error) {
            console.error(error);
        }
    }

    async addBudget(body: unknown): Promise<unknown> {
        try {
            return firstValueFrom(
                this.httpClient.post(`${environment.API_URL}/budget`, body)
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
