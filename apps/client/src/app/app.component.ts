import { Component, inject, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { ThemeService } from './shared/services/theme.service';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './auth/services/authentication.service';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import { environment } from '../../environments/environment';
import ThirdParty from 'supertokens-web-js/recipe/thirdparty';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { hlmH1 } from '@spartan-ng/ui-typography-helm';
import EmailVerification from 'supertokens-web-js/recipe/emailverification';

SuperTokens.init({
    appInfo: {
        appName: 'Grove',
        apiDomain: environment.SERVER_URL,
        apiBasePath: '/auth',
    },

    recipeList: [
        EmailPassword.init(),
        ThirdParty.init(),
        EmailVerification.init(),
        Session.init(),
    ],
});

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        CommonModule,
        HeaderComponent,
        SidenavComponent,
        HlmButtonDirective,
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
