import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../login/services/authentication.service';
import { inject } from '@angular/core';

export const isUserLoggedInGuard: CanActivateFn = (route, state) => {
  return inject(AuthenticationService).isUserLoggedIn();
};
