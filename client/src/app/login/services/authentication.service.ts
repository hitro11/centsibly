import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthToken } from '../../shared/models/AuthToken';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private localStorageService: LocalStorageService =
    inject(LocalStorageService);

  private authTokenLocalStorageKey = 'access_token';

  constructor(private http: HttpClient) {}

  async redirectToReddit() {
    const url =
      (await firstValueFrom(this.http.get(`${environment.apiUrl}/login`))) ??
      '';
    location.href = url as string;
  }

  async getAccessToken(code: string, state: string): Promise<AuthToken> {
    const token = await firstValueFrom(
      this.http.get<Promise<AuthToken>>(
        `${environment.apiUrl}/login/get-access-token?code=${code}&state=${state}`,
      ),
    );
    return token;
  }

  storeAccessToken(authToken: AuthToken): void {
    authToken.expiry = Date.now() + authToken.expires_in;
    this.localStorageService.set(this.authTokenLocalStorageKey, authToken);
  }

  isUserLoggedIn(): boolean {
    const authToken: AuthToken | null = this.localStorageService.get(
      this.authTokenLocalStorageKey,
    );
    return (authToken?.expiry ?? 0) > Date.now() ? true : false;
  }

  logout(): void {}
}
