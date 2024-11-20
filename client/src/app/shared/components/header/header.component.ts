import { AuthenticationService } from '../../../login/services/authentication.service';
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
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeService } from '../../services/theme.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HeaderProfileDropdownComponent } from './header-profile-dropdown/header-profile-dropdown.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatSlideToggleModule,
    HeaderProfileDropdownComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  logo = 'img/logo.png';
  themeService: ThemeService = inject(ThemeService);
  authService: AuthenticationService = inject(AuthenticationService);
  isUserLoggedIn: Signal<boolean> = this.authService.isUserLoggedIn();
  theme = this.themeService.getTheme();
  router = inject(Router);

  async signIn() {
    this.router.navigate(['/auth']);
  }
}
