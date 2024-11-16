import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { firstValueFrom, Observable, of } from 'rxjs';
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
  private jwtLocalStorageKey = 'jwt';
  private isLoggedInSignal = signal(false);

  constructor() {
    this.isLoggedInSignal.set(this.getAccessToken() !== null);
  }

  async startOauthLogin() {
    const url =
      (await firstValueFrom(
        this.http.get(`${environment.apiUrl}/auth/get-oauth-code`)
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
        accessToken
      );
      return;
    }

    this.localStorageService.set(this.accessTokenLocalStorageKey, accessToken);
  }

  getJWT(): string {
    return this.localStorageService.get(this.jwtLocalStorageKey);
  }

  isAccessTokenExpired(): boolean {
    return (this.getAccessToken()?.expiry ?? -1) <= Date.now() - 60000;
  }

  doesAccessTokenExist(): boolean {
    return this.getAccessToken() !== null;
  }

  async refreshAndSetAccessToken(
    accessToken: AccessToken | null
  ): Promise<void> {
    if (!accessToken) {
      console.error('no access token present');
      return;
    }

    const newAccessToken = await firstValueFrom(
      this.http.post<Promise<AccessToken>>(
        `${environment.apiUrl}/auth/refresh-tokens`,
        {
          refreshToken: accessToken.refresh_token,
        }
      )
    );

    this.setAccessToken(newAccessToken);
    return;
  }

  async logout(): Promise<void> {
    console.log('good bye!');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.localStorageService.delete(this.accessTokenLocalStorageKey);
    this.localStorageService.delete(this.jwtLocalStorageKey);
    this.isLoggedInSignal.set(false);
    this.router.navigate(['/']);
  }

  /* Handles logic for when reddit redirects back after user either authorizes our app or not */
  // todo: handle case if they do not authorize our app
  async handleOauthRedirectBack(code: string, state: string) {
    const { accessToken, authToken, username } = await firstValueFrom(
      this.http.get<
        Promise<{
          accessToken: AccessToken;
          authToken: string;
          username: string;
        }>
      >(`${environment.apiUrl}/auth/get-tokens?code=${code}&state=${state}`)
    );

    if (accessToken) {
      this.setAccessToken(accessToken);
      this.localStorageService.set(this.jwtLocalStorageKey, authToken);
      this.localStorageService.set('username', username);
      this.isLoggedInSignal.set(true);
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/']);
    }
  }

  isUserLoggedIn() {
    return this.isLoggedInSignal.asReadonly();
  }

  test() {
    return this.http.get(`${environment.apiUrl}/reddit/test`);
  }
}
