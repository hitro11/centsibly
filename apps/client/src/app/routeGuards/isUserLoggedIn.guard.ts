import { CanActivateFn } from '@angular/router';
import Session from 'supertokens-web-js/recipe/session';

export const isUserLoggedInGuard: CanActivateFn = async (route, state) => {
    return await Session.doesSessionExist();
};
