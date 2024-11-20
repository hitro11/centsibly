import { Component, inject, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { ThemeService } from './shared/services/theme.service';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './login/services/authentication.service';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import { environment } from '../../environments/environment';
import ThirdParty from 'supertokens-web-js/recipe/thirdparty';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword';

SuperTokens.init({
  appInfo: {
    appName: 'Grove',
    apiDomain: environment.HOST,
    apiBasePath: '/auth',
  },

  recipeList: [Session.init(), EmailPassword.init(), ThirdParty.init()],
});

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    SidenavComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'rSlash';
  themeService: ThemeService = inject(ThemeService);
  authService: AuthenticationService = inject(AuthenticationService);
  isUserLoggedIn: Signal<boolean> = this.authService.isUserLoggedIn();
}
