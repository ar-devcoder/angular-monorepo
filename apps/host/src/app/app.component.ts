import { Component, Renderer2, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

interface Theme {
  value: string;
  name: string;
}
@Component({
  imports: [
    RouterModule,
    FormsModule,
    MatFormFieldModule, MatSelectModule, MatInputModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnInit {
  title = 'host';
  isDarkMode = false;
  currentTheme = 'theme-default'; // 'theme-default', 'theme-blue', 'theme-green'


availableThemes: Theme[] = [
  { value: 'theme-default', name: 'Default' },
  { value: 'theme-blue', name: 'Blue' },
  { value: 'theme-green', name: 'Green' },
];

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.currentTheme = savedTheme;
    }

    // Check for saved dark mode preference or system preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      this.isDarkMode = savedDarkMode === 'true';
    } else {
      this.isDarkMode =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.applyThemes();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.applyThemes();
  }

  selectTheme(theme:Theme) {

    console.log(theme.value);
    this.currentTheme = theme.value;
    localStorage.setItem('theme', this.currentTheme);
    this.applyThemes();
  }

  private applyThemes() {
    // Remove all theme classes
    this.availableThemes.forEach((t) => {
      this.renderer.removeClass(this.document.documentElement, t.value);
    });
    this.renderer.removeClass(this.document.documentElement, 'light');
    this.renderer.removeClass(this.document.documentElement, 'dark');

    // Add current theme class
    this.renderer.addClass(this.document.documentElement, this.currentTheme);

    // Add light/dark mode class
    if (this.isDarkMode) {
      this.renderer.addClass(this.document.documentElement, 'dark');
    } else {
      this.renderer.addClass(this.document.documentElement, 'light');
    }
  }
}
