import { firstValueFrom } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { Budget, BudgetSchema } from '@centsibly/utils/schemas';
import { getMonth } from '@centsibly/utils/utils';
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
            data.month = getMonth();
            BudgetSchema.parse(data);
            await this.addBudget(data);
        } catch (error) {
            console.error(error);
        }
    }

    async addBudget(body: unknown): Promise<unknown> {
        return firstValueFrom(
            this.httpClient.post(`${environment.API_URL}/budget`, body)
        );
    }

    async getUserAccount() {
        return firstValueFrom(
            this.httpClient.get<Budget>(`${environment.API_URL}/user/account`)
        );
    }
}
