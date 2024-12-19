import { firstValueFrom } from 'rxjs';
import { effect, Injectable, signal } from '@angular/core';
import { AccountInfo, AccountInfoSchema } from '@centsibly/utils/schemas';
import { DeepPartial } from '../../shared/types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import Session from 'supertokens-web-js/recipe/session';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    _email = signal('');

    accountInfo: DeepPartial<AccountInfo> = {
        currency: 'CAD',
    };

    constructor(private httpClient: HttpClient) {
        effect(async () => {
            if (await Session.doesSessionExist()) {
                const email = ((await this.getUserInfo()) as any).emails[0];
                this._email.set(email);
            }
        });
    }

    get email(): string {
        return this._email();
    }

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
            this.httpClient.post(
                `${environment.API_URL}/user/account-info`,
                body
            )
        );
    }

    async getUserInfo() {
        return firstValueFrom(
            this.httpClient.get(`${environment.API_URL}/user/account-info`)
        );
    }
}
