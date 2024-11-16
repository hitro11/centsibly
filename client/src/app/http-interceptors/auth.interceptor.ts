import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';
import { AuthenticationService } from '../login/services/authentication.service';
import { inject } from '@angular/core';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  if (!req.url.includes('api/reddit/')) {
    return next(req);
  }

  const authService = inject(AuthenticationService);
  const accessTokenExpired = authService.isAccessTokenExpired();
  const accessTokenExists = authService.doesAccessTokenExist();
  const jwt = authService.getJWT();

  if (accessTokenExists && accessTokenExpired) {
    return from(
      authService.refreshAndSetAccessToken(authService.getAccessToken())
    ).pipe(
      switchMap(() => {
        const modifiedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authService.getJWT()}`,
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
      Authorization: `Bearer ${authService.getJWT()}`,
      'X-Reddit-OAuth': `Bearer ${authService.getAccessToken()}`,
    },
  });

  return next(modifiedReq);
}
