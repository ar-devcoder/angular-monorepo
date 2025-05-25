import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ThemeName = 'blue-light' | 'blue-dark' | 'orange-light' | 'orange-dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Default theme
  private readonly STORAGE_KEY = 'selected-theme';
  private readonly DEFAULT_THEME: ThemeName = 'blue-light';

  // Subject to track the current theme
  private themeSubject = new BehaviorSubject<ThemeName>(this.DEFAULT_THEME);

  constructor() {
    this.loadSavedTheme();
  }

  /**
   * Get the current theme as an observable
   */
  public get theme$(): Observable<ThemeName> {
    return this.themeSubject.asObservable();
  }

  /**
   * Get the current theme value
   */
  public get currentTheme(): ThemeName {
    return this.themeSubject.value;
  }

  /**
   * Set the application theme
   */
  public setTheme(theme: ThemeName): void {
    // Save to local storage
    localStorage.setItem(this.STORAGE_KEY, theme);

    // Update the subject
    this.themeSubject.next(theme);

    // Apply the theme to the DOM
    this.applyTheme(theme);
  }

  /**
   * Toggle between light and dark modes of the current theme color
   */
  public toggleDarkMode(): void {
    const currentTheme = this.currentTheme;
    const isDark = currentTheme.includes('dark');
    const baseColor = currentTheme.split('-')[0]; // 'blue' or 'orange'

    // Toggle between light and dark variants
    const newTheme = isDark
      ? `${baseColor}-light` as ThemeName
      : `${baseColor}-dark` as ThemeName;

    this.setTheme(newTheme);
  }

  /**
   * Toggle between blue and orange themes while maintaining light/dark preference
   */
  public toggleThemeColor(): void {
    const currentTheme = this.currentTheme;
    const isDark = currentTheme.includes('dark');
    const isBlue = currentTheme.includes('blue');

    // Toggle between blue and orange variants
    const newColor = isBlue ? 'orange' : 'blue';
    const newTheme = `${newColor}-${isDark ? 'dark' : 'light'}` as ThemeName;

    this.setTheme(newTheme);
  }

  /**
   * Load the saved theme from localStorage
   */
  private loadSavedTheme(): void {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY) as ThemeName | null;

    if (savedTheme && this.isValidTheme(savedTheme)) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme(this.DEFAULT_THEME);
    }
  }

  /**
   * Apply the theme to the DOM
   */
  private applyTheme(theme: ThemeName): void {
    // Find or create the theme wrapper element
    let themeWrapper = document.querySelector('.theme-wrapper') as HTMLElement;

    if (!themeWrapper) {
      // If no wrapper exists, create one and wrap the app content
      themeWrapper = document.createElement('div');
      themeWrapper.classList.add('theme-wrapper');

      // Move all body children into the wrapper
      while (document.body.firstChild) {
        themeWrapper.appendChild(document.body.firstChild);
      }

      // Append the wrapper to the body
      document.body.appendChild(themeWrapper);
    }

    // Remove all theme classes
    themeWrapper.classList.remove('blue-light', 'blue-dark', 'orange-light', 'orange-dark');

    // Add the selected theme class
    themeWrapper.classList.add(theme);

    // Update body class for general dark/light styling
    if (theme.includes('dark')) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  /**
   * Validate that the theme name is one of the allowed values
   */
  private isValidTheme(theme: string): theme is ThemeName {
    return ['blue-light', 'blue-dark', 'orange-light', 'orange-dark'].includes(theme);
  }
}
