import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Session from 'supertokens-web-js/recipe/session';

export const AuthGuard: CanActivateFn = async (route, state) => {
    const router = inject(Router);

    if (await Session.doesSessionExist()) {
        return true;
    }

    const redirectTo = route.data['redirectTo'] || '/auth';
    return router.parseUrl(redirectTo);
};
