import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss',
})
export class CallbackComponent implements OnInit {
  private authService: AuthenticationService = inject(AuthenticationService);
  private router: Router = inject(Router);

  async ngOnInit(): Promise<void> {
    console.log('callback!!');
    const callbackUrl = new URL(window.location.href);
    console.log(callbackUrl);
    const code = callbackUrl.searchParams.get('code') ?? '';
    const state = callbackUrl.searchParams.get('state') ?? '';
    // const authToken = await this.loginService.getAccessTokenFromOauth(
    //   code,
    //   state,
    // );

    // await this.authService.handleOauthRedirectBack(code, state);

    // if (authToken) {
    //   this.loginService.setAccessToken(authToken);
    //   this.router.navigate(['/home']);
    // } else {
    //   this.router.navigate(['/']);
    // }
  }
}
