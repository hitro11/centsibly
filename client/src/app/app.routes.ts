import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { HomeComponent } from './home/home.component';
import { isUserLoggedInGuard } from './routeGuards/isUserLoggedIn.guard';
import { GoogleCallbackComponent } from './auth/callbacks/google-callback.component';

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
      {
        path: 'callback/google',
        component: GoogleCallbackComponent,
      },
    ],
  },
];
