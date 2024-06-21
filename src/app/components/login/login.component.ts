import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginData = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private router: Router) {}

  login() {
    // Normally you would call a service to authenticate
    // For demo purposes, check against hardcoded values
    let email = JSON.parse(localStorage.getItem("currentUser") as string).email
    let password = JSON.parse(localStorage.getItem("currentUser") as string).password

    if (this.loginData.email === email && this.loginData.password === password) {
      localStorage.setItem('currentUser', JSON.stringify({ email: this.loginData.email, password: this.loginData.password }));
      this.router.navigate(['/notes']); // Navigate to notes page on successful login
    } else {
      this.errorMessage = 'Invalid email or password. Please try again.';
    }
  }
}
