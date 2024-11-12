import { AuthenticationService } from './login/services/authentication.service';
import { Routes } from '@angular/router';
import { OauthCallbackComponent } from './login/oauth-callback/oauth-callback.component';
import { HomeComponent } from './home/home.component';
import { isUserLoggedInGuard } from './routeGuards/isUserLoggedIn.guard';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [isUserLoggedInGuard],
  },
  { path: 'oauth-callback', component: OauthCallbackComponent },
];
