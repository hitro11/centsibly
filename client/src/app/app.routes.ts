import { VerifyEmailComponent } from './login/verify-email/verify-email.component';
import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { isUserLoggedInGuard } from './routeGuards/isUserLoggedIn.guard';
import { GoogleCallbackComponent } from './auth/callbacks/google-callback.component';
import { GithubCallbackComponent } from './auth/callbacks/github-callback.component';
import { CreateAccountComponent } from './login/create-account/create-account.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [isUserLoggedInGuard],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'verify-email', component: VerifyEmailComponent },
      { path: 'callback/google', component: GoogleCallbackComponent },
      { path: 'callback/github', component: GithubCallbackComponent },
    ],
  },
  { path: 'create-account', component: CreateAccountComponent },
];
