import { firstValueFrom, Observable } from 'rxjs';
import { effect, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import Session from 'supertokens-web-js/recipe/session';
import { AccountInfo } from 'utils/schemas/schemas';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _email = signal('');
    readonly email = this._email.asReadonly();

    constructor(private httpClient: HttpClient) {
        this.setUserEmail();
    }

    async setUserEmail() {
        if (!(await Session.doesSessionExist())) {
            return;
        }

        const email = await this.getUserEmail();
        this._email.set(email);
    }

    async getUserAuthInfo(): Promise<unknown> {
        return firstValueFrom(
            this.httpClient.get(`${environment.API_URL}/user/auth-info`)
        );
    }

    async getUserEmail(): Promise<string> {
        const response = await firstValueFrom(
            this.httpClient.get<{ email: string }>(
                `${environment.API_URL}/user/email`
            )
        );

        return response.email;
    }

    async doesAccountExist(): Promise<boolean> {
        const response = await firstValueFrom(
            this.httpClient.get<{ doesAccountExist: boolean }>(
                `${environment.API_URL}/user/exists`
            )
        );

        return response.doesAccountExist;
    }

    async getAccountInfo(): Promise<AccountInfo> {
        const resp = await firstValueFrom(
            this.httpClient.get<AccountInfo>(
                `${environment.API_URL}/user/account`
            )
        );
        return resp;
    }
}
