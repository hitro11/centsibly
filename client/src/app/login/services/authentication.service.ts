import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthToken as AccessToken } from '../../shared/models/AccessToken';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private localStorageService: LocalStorageService =
    inject(LocalStorageService);

  private accessTokenLocalStorageKey = 'access_token';

  constructor(private http: HttpClient) {}

  async redirectToReddit() {
    const url =
      (await firstValueFrom(
        this.http.get(`${environment.apiUrl}/auth/get-oauth-code`),
      )) ?? '/';
    location.href = url as string;
  }

  async getAccessTokenFromOauth(
    code: string,
    state: string,
  ): Promise<AccessToken> {
    const accessToken = await firstValueFrom(
      this.http.get<Promise<AccessToken>>(
        `${environment.apiUrl}/auth/get-access-token?code=${code}&state=${state}`,
      ),
    );
    return accessToken;
  }

  getAccessToken(): AccessToken {
    return this.localStorageService.get(this.accessTokenLocalStorageKey);
  }

  setAccessToken(authToken: AccessToken): void {
    authToken.expiry = Date.now() + authToken.expires_in * 1000;
    this.localStorageService.set(this.accessTokenLocalStorageKey, authToken);
  }

  isAccessTokenExpired(): boolean {
    return (this.getAccessToken()?.expiry ?? -1) <= Date.now() - 60000;
  }

  doesAccessTokenExist(): boolean {
    return this.getAccessToken() !== null;
  }

  isUserLoggedIn(): boolean {
    return this.doesAccessTokenExist() && !this.isAccessTokenExpired();
  }

  async refreshAndSetAccessToken(accessToken: AccessToken): Promise<void> {
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

  logout(): void {}
}
