import { firstValueFrom } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { Budget, BudgetSchema, Expense } from '@centsibly/utils/schemas';
import { getCurrentMonth } from '@centsibly/utils/utils';
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
            data.month = getCurrentMonth();
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
            return firstValueFrom(
                this.httpClient.get<Budget | null>(
                    `${environment.API_URL}/budgets?latest=true`
                )
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
