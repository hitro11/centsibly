import { AuthenticationService } from '../../../auth/services/authentication.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  inject,
  OnChanges,
  OnInit,
  Signal,
  SimpleChanges,
} from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { HeaderProfileDropdownComponent } from './header-profile-dropdown/header-profile-dropdown.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderProfileDropdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  logoPath = '';
  themeService: ThemeService = inject(ThemeService);
  authService: AuthenticationService = inject(AuthenticationService);
  isUserLoggedIn: Signal<boolean> = this.authService.isUserLoggedIn();
  theme = this.themeService.getTheme();
  router = inject(Router);

  constructor() {
    effect(() => {
      this.logoPath =
        this.theme() === 'dark'
          ? './img/logo-dark.png'
          : './img/logo-light.png';
    });
  }

  async signIn() {
    this.router.navigate(['/auth']);
  }
}
