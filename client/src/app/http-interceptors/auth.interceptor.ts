import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';
import { AuthenticationService } from '../login/services/authentication.service';
import { inject } from '@angular/core';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { USERNAME_LOCAL_STORAGE_KEY } from '../shared/constants';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  if (!req.url.includes('api/reddit/')) {
    return next(req);
  }

  const authService = inject(AuthenticationService);
  const localStorageService = inject(LocalStorageService);
  const accessTokenExpired = authService.isAccessTokenExpired();
  const accessTokenExists = authService.doesAccessTokenExist();
  const jwt = authService.getAuthToken();

  if (accessTokenExists && accessTokenExpired) {
    const username = localStorageService.get(USERNAME_LOCAL_STORAGE_KEY);

    return from(
      authService.refreshAndSetTokens(authService.getAccessToken(), username)
    ).pipe(
      switchMap(() => {
        const modifiedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authService.getAuthToken()}`,
            'X-Reddit-OAuth': authService.getAccessToken()
              ?.access_token as string,
          },
        });
        return next(modifiedReq);
      })
    );
  } else if (!accessTokenExists) {
    // todo: redirect user to oAuth flow
  }

  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.getAuthToken()}`,
      'X-Reddit-OAuth': `Bearer ${authService.getAccessToken()?.access_token}`,
    },
  });

  return next(modifiedReq);
}
