import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { HomeComponent } from './home/home.component';
import { isUserLoggedInGuard } from './routeGuards/isUserLoggedIn.guard';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [isUserLoggedInGuard],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  // },
];
