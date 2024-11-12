import { Routes } from '@angular/router';
import { OauthCallbackComponent } from './login/oauth-callback/oauth-callback.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'oauth-callback', component: OauthCallbackComponent},
];
