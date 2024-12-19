import { firstValueFrom } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { AccountInfo, AccountInfoSchema } from '@centsibly/utils/schemas';
import { DeepPartial } from '../../../shared/types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class BudgetService {
    httpClient = inject(HttpClient);

    accountInfo: DeepPartial<AccountInfo> = {
        currency: 'CAD',
    };

    async onSetupFormSubmit(): Promise<void> {
        try {
            const data = this.accountInfo;
            AccountInfoSchema.parse(data);
            await this.sendFormDataToBackend(data);
        } catch (error) {
            console.error(error);
        }
    }

    async sendFormDataToBackend(body: unknown): Promise<unknown> {
        return firstValueFrom(
            this.httpClient.post(`${environment.API_URL}/user/account`, body)
        );
    }

    async getUserAccount() {
        return firstValueFrom(
            this.httpClient.get(`${environment.API_URL}/user/account`)
        );
    }
}
