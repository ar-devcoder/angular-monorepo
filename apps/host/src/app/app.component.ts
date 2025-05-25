import { Component, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  imports: [ RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'host';
  isDarkMode = false;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
    // Optional: Check for saved preference or system preference
    this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.updateTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.updateTheme();
  }

  private updateTheme() {
    if (this.isDarkMode) {
      this.renderer.addClass(this.document.documentElement, 'dark');
      this.renderer.removeClass(this.document.documentElement, 'light');
    } else {
      this.renderer.addClass(this.document.documentElement, 'light');
      this.renderer.removeClass(this.document.documentElement, 'dark');
    }
  }
}
