import { LoginService } from '../../../login/services/login';
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
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule, MatSlideToggleModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  logo = 'img/logo.jpg';
  themeService: ThemeService = inject(ThemeService);
  loginService: LoginService = inject(LoginService);


  toggleTheme() {
    this.themeService.toggleTheme();
  }

  login() {
    this.loginService.redirectToReddit();
  }

}
