import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeSignal = signal<string>('dark-theme');

  toggleTheme() {
    this.themeSignal.update((value) => value === 'dark-theme' ? 'light-theme' : 'dark-theme');
    console.log(this.themeSignal());
  }

  getTheme(): string {
    return this.themeSignal();
  }
}
