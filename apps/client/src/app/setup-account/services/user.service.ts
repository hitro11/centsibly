import { firstValueFrom, Observable } from 'rxjs';
import { effect, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import Session from 'supertokens-web-js/recipe/session';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    _email = signal('');

    constructor(private httpClient: HttpClient) {
        effect(async () => {
            if (await Session.doesSessionExist()) {
                const email = await this.getUserEmail();
                console.log(email);
                this._email.set(email);
            }
        });
    }

    get email(): string {
        return this._email();
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
}
