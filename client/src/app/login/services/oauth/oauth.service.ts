import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { firstValueFrom, Observable, of } from 'rxjs';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class OauthService {
  constructor() {}
}
