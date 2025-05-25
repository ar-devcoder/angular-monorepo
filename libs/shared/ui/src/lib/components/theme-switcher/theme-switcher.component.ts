import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService, ThemeName } from '../../services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  template: `
    <div class="theme-switcher-container">
      <!-- Dark/Light mode toggle -->
      <button
       mat-mini-fab
        (click)="toggleDarkMode()"
        [matTooltip]="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'">
        <mat-icon>{{ isDarkMode ? 'light_mode' : 'dark_mode' }}</mat-icon>
      </button>

      <!-- Color theme toggle -->
      <button
       mat-mini-fab
        (click)="toggleThemeColor()"
        [matTooltip]="isBlueTheme ? 'Switch to orange theme' : 'Switch to blue theme'">
        <mat-icon>palette</mat-icon>
        <div class="color-indicator" [ngClass]="isBlueTheme ? 'orange-indicator' : 'blue-indicator'"></div>
      </button>
    </div>
  `,
  styles: [`
    .theme-switcher-container {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .color-indicator {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      bottom: 8px;
      right: 8px;
    }

    .orange-indicator {
      background-color: #ff9800;
    }

    .blue-indicator {
      background-color: #2196f3;
    }
  `]
})
export class ThemeSwitcherComponent implements OnInit {
  isDarkMode = false;
  isBlueTheme = true;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Update component state based on the current theme
    this.themeService.theme$.subscribe((theme: ThemeName) => {
      this.isDarkMode = theme.includes('dark');
      this.isBlueTheme = theme.includes('blue');
    });
  }

  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }

  toggleThemeColor(): void {
    this.themeService.toggleThemeColor();
  }
}
