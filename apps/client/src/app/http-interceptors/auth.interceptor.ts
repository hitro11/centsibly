import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';
import { AuthenticationService } from '../auth/services/authentication.service';
import { inject } from '@angular/core';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { USERNAME_LOCAL_STORAGE_KEY } from '../shared/constants';

export function authInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
    return next(req);
}
