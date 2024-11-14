import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthToken as AccessToken } from '../../shared/models/AccessToken';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private localStorageService: LocalStorageService =
    inject(LocalStorageService);
  private router = inject(Router);
  private http = inject(HttpClient);
  private accessTokenLocalStorageKey = 'access_token';
  private isLoggedInSignal = signal(false);

  constructor() {
    this.isLoggedInSignal.set(this.getAccessToken() !== null);
  }

  async startOauthLogin() {
    const url =
      (await firstValueFrom(
        this.http.get(`${environment.apiUrl}/auth/get-oauth-code`),
      )) ?? '/';
    location.href = url as string;
  }

  getAccessToken(): AccessToken | null {
    return this.localStorageService.get(this.accessTokenLocalStorageKey);
  }

  setAccessToken(accessToken: AccessToken | ''): void {
    if (accessToken === '') {
      this.localStorageService.set(
        this.accessTokenLocalStorageKey,
        accessToken,
      );
      return;
    }

    accessToken.expiry = Date.now() + accessToken.expires_in * 1000;
    this.localStorageService.set(this.accessTokenLocalStorageKey, accessToken);
  }

  deleteAccessToken(): void {
    this.localStorageService.delete(this.accessTokenLocalStorageKey);
  }

  isAccessTokenExpired(): boolean {
    return (this.getAccessToken()?.expiry ?? -1) <= Date.now() - 60000;
  }

  doesAccessTokenExist(): boolean {
    return this.getAccessToken() !== null;
  }

  async refreshAndSetAccessToken(
    accessToken: AccessToken | null,
  ): Promise<void> {
    console.log('refreshAndSetAccessToken()');
    if (!accessToken) {
      console.error('no access token present');
      return;
    }

    const newAccessToken = await firstValueFrom(
      this.http.post<Promise<AccessToken>>(
        `${environment.apiUrl}/auth/refresh-access-token`,
        {
          refreshToken: accessToken.refresh_token,
        },
      ),
    );

    this.setAccessToken(newAccessToken);
    return;
  }

  async logout(): Promise<void> {
    console.log('good bye!');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.deleteAccessToken();
    this.isLoggedInSignal.set(false);
    this.router.navigate(['/']);
  }

  /* Handles logic for when reddit redirects back after user either authorizes our app or not */
  // todo: handle case if they do not authorize our app
  async handleOauthRedirectBack(code: string, state: string) {
    const accessToken = await firstValueFrom(
      this.http.get<Promise<AccessToken>>(
        `${environment.apiUrl}/auth/get-access-token?code=${code}&state=${state}`,
      ),
    );

    console.log('handleOauthRedirectBack(): token: ', accessToken);

    if (accessToken) {
      this.setAccessToken(accessToken);
      this.isLoggedInSignal.set(true);
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/']);
    }
  }

  isUserLoggedIn() {
    return this.isLoggedInSignal.asReadonly();
  }
}
