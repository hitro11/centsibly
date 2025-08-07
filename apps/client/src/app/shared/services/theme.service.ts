import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, RendererFactory2, signal } from '@angular/core';

type Theme = 'dark' | 'light';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private _renderer = inject(RendererFactory2).createRenderer(null, null);
    private _document = inject(DOCUMENT);

    private _theme = signal<Theme>('light');
    readonly theme = this._theme.asReadonly();

    constructor() {
        this.setTheme(this.getThemeFromLocalStorage());
    }

    public toggleTheme(): void {
        this.setTheme(this.getThemeFromLocalStorage());
    }

    setTheme(theme: Theme) {
        const docElement = this._document.documentElement;

        if (theme === 'dark') {
            this._renderer.addClass(docElement, 'dark');
        } else {
            this._renderer.removeClass(docElement, 'dark');
        }

        localStorage.setItem('theme', theme);
        this._theme.set(theme);
    }

    private getThemeFromLocalStorage(): Theme {
        return localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    }
}
