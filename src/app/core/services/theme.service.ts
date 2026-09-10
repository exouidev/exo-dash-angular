import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';
export type ColorScheme = 'zinc' | 'blue' | 'rose' | 'green';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly currentTheme = signal<Theme>('dark');
  readonly colorScheme = signal<ColorScheme>('blue');

  constructor() {
    // Light/Dark Theme Initialization
    const savedTheme = localStorage.getItem('app-theme') as Theme | null;
    if (savedTheme) {
      this.currentTheme.set(savedTheme);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentTheme.set(prefersDark ? 'dark' : 'light');
    }

    // Color Scheme Initialization
    const savedScheme = localStorage.getItem('app-color-scheme') as ColorScheme | null;
    if (savedScheme) {
      this.colorScheme.set(savedScheme);
    }

    // Sync Light/Dark to DOM
    effect(() => {
      const theme = this.currentTheme();
      localStorage.setItem('app-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });

    // Sync Color Scheme to DOM
    effect(() => {
      const scheme = this.colorScheme();
      localStorage.setItem('app-color-scheme', scheme);
      
      // Remove all theme classes first
      const classesToRemove = Array.from(document.documentElement.classList).filter(c => c.startsWith('theme-'));
      document.documentElement.classList.remove(...classesToRemove);
      
      // Add the new theme class (except zinc since it uses default roots)
      if (scheme !== 'zinc') {
        document.documentElement.classList.add(`theme-${scheme}`);
      }
    });
  }

  toggleTheme() {
    this.currentTheme.update(t => t === 'light' ? 'dark' : 'light');
  }

  setColorScheme(scheme: ColorScheme) {
    this.colorScheme.set(scheme);
  }
}
