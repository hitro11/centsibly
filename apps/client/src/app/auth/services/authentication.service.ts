import { HTTPresponse } from '@centsibly/utils/schemas';
import Session from 'supertokens-web-js/recipe/session';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { effect, inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import EmailVerification from 'supertokens-web-js/recipe/emailverification';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private localStorageService: LocalStorageService =
        inject(LocalStorageService);
    private router = inject(Router);
    private http = inject(HttpClient);
    private isLoggedInSignal = signal(false);

    constructor() {
        effect(async () => {
            const isLoggedIn = await Session.doesSessionExist();
            this.isLoggedInSignal.set(isLoggedIn);
        });
    }

    isUserLoggedIn() {
        return this.isLoggedInSignal.asReadonly();
    }

    async signout(): Promise<void> {
        console.log('goodbye!');
        await Session.signOut();
        this.router.navigate(['/auth']);
        this.isLoggedInSignal.set(false);
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
