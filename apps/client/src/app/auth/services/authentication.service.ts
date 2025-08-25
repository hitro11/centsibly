import { HTTPresponse } from '@centsibly/utils/httpTypes';
import Session from 'supertokens-web-js/recipe/session';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { effect, inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import EmailVerification from 'supertokens-web-js/recipe/emailverification';
import SuperTokens from 'supertokens-web-js';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private localStorageService: LocalStorageService =
        inject(LocalStorageService);
    private router = inject(Router);
    private http = inject(HttpClient);

    private _isUserLoggedIn = signal(false);
    readonly isUserLoggedIn = this._isUserLoggedIn.asReadonly();

    constructor() {
        this.checkAuthStatus();
    }

    async checkAuthStatus(): Promise<void> {
        this._isUserLoggedIn.set(await Session.doesSessionExist());
    }

    async signout(): Promise<void> {
        console.log('goodbye!');
        await Session.signOut();
        this.router.navigate(['/auth']);
        this._isUserLoggedIn.set(false);
    }

    async getUserId(): Promise<string> {
        if (await Session.doesSessionExist()) {
            return Session.getUserId();
        } else {
            return '';
        }
    }

    // cookies sent with the request identify the userid - no need to pass it in
    getUserRoles() {
        return this.http.get(`${environment.API_URL}/user/roles`);
    }

    setUserRoleForUser() {
        return this.http.post(`${environment.API_URL}/user/roles`, {});
    }

    getUserInfo() {
        return this.http.get<{ emails: string[]; id: string }>(
            `${environment.API_URL}/user/info`
        );
    }

    setUsername(username: string) {
        return this.http.post<HTTPresponse>(
            `${environment.API_URL}/user/setUsername`,
            { username }
        );
    }

    async isUserEmailVerified(): Promise<boolean> {
        try {
            const isVerified = await EmailVerification.isEmailVerified();
            return isVerified.status === 'OK' && isVerified.isVerified;
        } catch (error) {
            console.error('Error checking email verification status:', error);
            return false;
        }
    }
}
