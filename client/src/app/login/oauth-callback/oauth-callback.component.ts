import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { AuthToken } from '../../shared/models/AuthToken';

@Component({
  selector: 'app-oauth-callback',
  standalone: true,
  imports: [],
  templateUrl: './oauth-callback.component.html',
  styleUrl: './oauth-callback.component.scss',
})
export class OauthCallbackComponent implements OnInit {
  private loginService: LoginService = inject(LoginService);

  async ngOnInit(): Promise<void> {
    const callbackUrl = new URL(window.location.href);
    const state = callbackUrl.searchParams.get('state') ?? '';
    const code = callbackUrl.searchParams.get('code') ?? '';
    const authToken = await this.loginService.getAccessToken(code, state);
    console.log(authToken);
    this.loginService.storeAccessToken(authToken);
  }
}
