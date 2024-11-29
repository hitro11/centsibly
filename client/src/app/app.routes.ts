import { VerifyEmailComponent } from './login/verify-email/verify-email.component';
import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { GoogleCallbackComponent } from './auth/callbacks/google-callback.component';
import { GithubCallbackComponent } from './auth/callbacks/github-callback.component';
import { SetupAccountComponent } from './setup-account/setup-account.component';
import { isUserLoggedInGuard } from './routeGuards/isUserLoggedIn.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'verify-email', component: VerifyEmailComponent },
      { path: 'callback/google', component: GoogleCallbackComponent },
      { path: 'callback/github', component: GithubCallbackComponent },
    ],
  },
  {
    path: 'create-account',
    component: SetupAccountComponent,
    canActivate: [isUserLoggedInGuard],
  },
];
