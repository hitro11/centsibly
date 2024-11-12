import { AuthenticationService } from '../../../login/services/authentication.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeService } from '../../services/theme.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  logo = 'img/logo.jpg';
  themeService: ThemeService = inject(ThemeService);
  authenticationService: AuthenticationService = inject(AuthenticationService);

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  login() {
    this.authenticationService.redirectToReddit();
  }

  logout() {
    this.authenticationService.logout();
  }
}
