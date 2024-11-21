import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  inject,
  Injectable,
  PLATFORM_ID,
  RendererFactory2,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themeSignal = signal<'dark' | 'light'>('light');
  private _renderer = inject(RendererFactory2).createRenderer(null, null);
  private _document = inject(DOCUMENT);

  constructor() {
    const currentTheme =
      localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    this.setTheme(currentTheme);
  }

  public toggleTheme(): void {
    const newTheme =
      localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  setTheme(theme: 'dark' | 'light') {
    if (theme === 'dark') {
      this._renderer.addClass(this._document.documentElement, 'dark');
    } else {
      this._renderer.removeClass(this._document.documentElement, 'dark');
    }

    localStorage.setItem('theme', theme);
    this.themeSignal.update(() => theme);
  }

  getTheme(): Signal<'dark' | 'light'> {
    return this.themeSignal.asReadonly();
  }
}
