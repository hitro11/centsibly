import Session from 'supertokens-web-js/recipe/session';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { effect, inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';

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
      console.log({ isLoggedIn });
      this.isLoggedInSignal.set(isLoggedIn);
    });
  }

  isUserLoggedIn() {
    return this.isLoggedInSignal.asReadonly();
  }

  async logout(): Promise<void> {
    console.log('goodbye!');
    await Session.signOut();
    this.router.navigate(['/auth']);
  }

  test() {
    return this.http.get(`${environment.API_URL}/reddit/test`);
  }
}
