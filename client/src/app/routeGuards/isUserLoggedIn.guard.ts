import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../login/services/authentication.service';
import { inject } from '@angular/core';

export const isUserLoggedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  return authService.isUserLoggedIn();
};
