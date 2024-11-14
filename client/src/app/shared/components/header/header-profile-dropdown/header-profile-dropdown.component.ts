import { ThemeService } from './../../../services/theme.service';
import { AuthenticationService } from './../../../../login/services/authentication.service';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-profile-dropdown',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatSlideToggleModule],
  templateUrl: './header-profile-dropdown.component.html',
  styleUrl: './header-profile-dropdown.component.scss',
})
export class HeaderProfileDropdownComponent {
  authService = inject(AuthenticationService);
  themeService = inject(ThemeService);

  toggleTheme($event: Event): void {
    $event.stopPropagation();
    this.themeService.toggleTheme();
  }
}
