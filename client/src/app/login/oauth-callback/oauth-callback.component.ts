import { Component, inject, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { LoginService } from '../services/login.service'

@Component({
  selector: 'app-oauth-callback',
  standalone: true,
  imports: [],
  templateUrl: './oauth-callback.component.html',
  styleUrl: './oauth-callback.component.scss',
})
export class OauthCallbackComponent implements OnInit {
  private loginService: LoginService = inject(LoginService)

  async ngOnInit(): Promise<void> {
    const callbackUrl = new URL(window.location.href)
    const state = callbackUrl.searchParams.get('state') ?? ''
    const code = callbackUrl.searchParams.get('code') ?? ''
    await this.loginService.getAccessToken(code, state)
  }
}
