import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthToken } from '../../shared/models/AuthToken';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private localStorageService: LocalStorageService =
    inject(LocalStorageService);

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
    this.localStorageService.set('access_token', authToken);
  }
}
