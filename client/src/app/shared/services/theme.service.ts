import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  overlay;

  constructor(private overlayContainer: OverlayContainer) {
    this.overlay = overlayContainer.getContainerElement();
  }

  themeSignal = signal<'dark-theme' | 'light-theme'>('dark-theme');

  toggleTheme() {
    if (this.overlay.classList.contains('dark-theme')) {
      this.overlay.classList.remove('dark-theme');
      this.overlay.classList.add('light-theme');
    } else if (this.overlay.classList.contains('light-theme')) {
      this.overlay.classList.remove('light-theme');
      this.overlay.classList.add('dark-theme');
    } else {
      this.overlay.classList.add('light-theme');
    }

    this.themeSignal.update((value) =>
      value === 'dark-theme' ? 'light-theme' : 'dark-theme',
    );
  }

  getTheme(): string {
    return this.themeSignal();
  }
}
