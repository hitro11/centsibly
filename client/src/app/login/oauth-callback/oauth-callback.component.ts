import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AuthToken } from '../../shared/models/AccessToken';

@Component({
  selector: 'app-oauth-callback',
  standalone: true,
  imports: [],
  templateUrl: './oauth-callback.component.html',
  styleUrl: './oauth-callback.component.scss',
})
export class OauthCallbackComponent implements OnInit {
  private loginService: AuthenticationService = inject(AuthenticationService);
  private router: Router = inject(Router);

  async ngOnInit(): Promise<void> {
    const callbackUrl = new URL(window.location.href);
    const state = callbackUrl.searchParams.get('state') ?? '';
    const code = callbackUrl.searchParams.get('code') ?? '';
    const authToken = await this.loginService.getAccessTokenFromOauth(
      code,
      state,
    );

    if (authToken) {
      this.loginService.setAccessToken(authToken);
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
