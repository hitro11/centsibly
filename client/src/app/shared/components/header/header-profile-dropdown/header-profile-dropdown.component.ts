import { ThemeService } from './../../../services/theme.service';
import { AuthenticationService } from './../../../../auth/services/authentication.service';
import { Component, inject, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import {
  lucideLogIn,
  lucideLogOut,
  lucideMenu,
  lucideMoon,
  lucideUserCircle,
} from '@ng-icons/lucide';

import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemIconDirective,
  HlmMenuItemSubIndicatorComponent,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent,
  HlmSubMenuComponent,
} from '@spartan-ng/ui-menu-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-profile-dropdown',
  standalone: true,
  imports: [
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmSubMenuComponent,
    HlmMenuItemDirective,
    HlmMenuItemSubIndicatorComponent,
    HlmMenuLabelComponent,
    HlmMenuShortcutComponent,
    HlmMenuSeparatorComponent,
    HlmMenuItemIconDirective,
    HlmMenuGroupComponent,
    HlmButtonDirective,
    HlmIconComponent,
  ],
  templateUrl: './header-profile-dropdown.component.html',
  styleUrl: './header-profile-dropdown.component.scss',
  providers: [
    provideIcons({
      lucideUserCircle,
      lucideLogOut,
      lucideMoon,
      lucideMenu,
      lucideLogIn,
    }),
  ],
})
export class HeaderProfileDropdownComponent {
  authService = inject(AuthenticationService);
  themeService = inject(ThemeService);
  localStorageService = inject(LocalStorageService);
  theme = this.themeService.getTheme();
  username = this.localStorageService.get('username') ?? 'hitro11';
  isUserLoggedIn = this.authService.isUserLoggedIn();
  router = inject(Router);

  signInOrSignOut() {
    return this.isUserLoggedIn()
      ? this.authService.signout()
      : this.router.navigate(['/auth']);
  }
}
