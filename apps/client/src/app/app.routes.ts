import { VerifyEmailComponent } from './login/verify-email/verify-email.component';
import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GoogleCallbackComponent } from './auth/callbacks/google-callback.component';
import { GithubCallbackComponent } from './auth/callbacks/github-callback.component';
import { SetupAccountComponent } from './setup-account/setup-account.component';
import { SignedInGuard } from './routeGuards/signed-in.guard';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { AuthGuard } from './routeGuards/auth.guard';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    {
        path: 'auth',
        component: AuthComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'verify-email', component: VerifyEmailComponent },
            { path: 'callback/google', component: GoogleCallbackComponent },
            { path: 'callback/github', component: GithubCallbackComponent },
        ],
    },
    {
        path: 'create-account',
        component: SetupAccountComponent,
        canActivate: [SignedInGuard],
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [SignedInGuard],
    },
];
