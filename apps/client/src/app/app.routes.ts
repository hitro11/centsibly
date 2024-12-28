import { VerifyEmailComponent } from './login/verify-email/verify-email.component';
import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GoogleCallbackComponent } from './auth/callbacks/google-callback.component';
import { GithubCallbackComponent } from './auth/callbacks/github-callback.component';
import { SetupAccountComponent } from './setup-account/setup-account.component';
import { AuthGuard } from './routeGuards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { NoAuthGuard } from './routeGuards/no-auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent,
        canActivate: [NoAuthGuard],
        data: { redirectTo: '/dashboard' },
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
    {
        path: 'setup-budget',
        component: SetupAccountComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
    },
];
