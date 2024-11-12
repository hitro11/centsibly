import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment'
import { inject, Injectable } from '@angular/core'
import { firstValueFrom } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // private http: HttpClient = inject(HttpClient);

  constructor(private http: HttpClient) {}

  async redirectToReddit() {
    const url =
      (await firstValueFrom(this.http.get(`${environment.apiUrl}/login`))) ?? ''
    location.href = url as string
  }

  async getAccessToken(code: string, state: string) {
    const token = await firstValueFrom(
      this.http.get(
        `${environment.apiUrl}/login/get-access-token?code=${code}&state=${state}`
      )
    )
    console.log(token)
  }
}
