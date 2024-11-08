import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private scope = 'identity';

  constructor() { }

  redirectToReddit() {
    const state = Math.random().toString(36).substr(2, 5);
    const url = `${environment.redditOauthUrl}/v1/authorize?client_id=id&response_type=code&state=${state}&redirect_uri=${environment.redditOauthRedirectUri}&duration=temporary&scope=${this.scope}`
    console.log(url);
  }
}
 