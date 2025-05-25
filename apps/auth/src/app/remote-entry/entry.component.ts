import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthLayoutComponent } from '@popcx/ui';

@Component({
  imports: [CommonModule, RouterOutlet, AuthLayoutComponent],
  selector: 'app-auth-entry',
  templateUrl: './entry.component.html',
})
export class RemoteEntryComponent {}
