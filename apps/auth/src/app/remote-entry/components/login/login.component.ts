import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent, SelectComponent } from '@popcx/ui';

@Component({
  selector: 'app-login',
  imports: [CommonModule, InputComponent, SelectComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
