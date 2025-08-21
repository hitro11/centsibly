import { AuthenticationService } from '../../../auth/services/authentication.service';
import { Component, inject, Signal } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { HeaderProfileDropdownComponent } from './header-profile-dropdown/header-profile-dropdown.component';
import { Router, RouterLink } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { lucideMoon, lucideSun } from '@ng-icons/lucide';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        HeaderProfileDropdownComponent,
        HlmButtonDirective,
        HlmIconComponent,
        HlmMenuModule,
        RouterLink,
    ],
    providers: [provideIcons({ lucideMoon, lucideSun })],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    logoPath = './img/logo.png';
    themeService: ThemeService = inject(ThemeService);
    theme = this.themeService.theme;
    authService: AuthenticationService = inject(AuthenticationService);
    isUserLoggedIn = this.authService.isUserLoggedIn;
    router = inject(Router);
    isUserVerified = false;

    async ngOnInit() {
        this.isUserVerified = await this.authService.isUserEmailVerified();
    }
}
