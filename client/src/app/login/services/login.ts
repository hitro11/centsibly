import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // private http: HttpClient = inject(HttpClient);

  constructor(private http: HttpClient) { }

  async redirectToReddit() {
    const url = await firstValueFrom(this.http.get(`${environment.apiUrl}/login`));
    console.log(url);
    window.open(url as string, "_blank");
  }
}
