import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})

export class RegisterComponent {
  registerData = { username: '', email: '', password: '' };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  register() {
    // Normally you would call a service to register the user
    // For demo purposes, simulate successful registration
    if (this.registerData.username && this.registerData.email && this.registerData.password) {
      // Save user data to local storage
      localStorage.setItem('currentUser', JSON.stringify({ email: this.registerData.email, password: this.registerData.password }));
      this.successMessage = 'Registration successful!';
      this.errorMessage = ''; // Clear any previous error messages
      // Optional: You can navigate to login page after successful registration
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Please fill out all fields.';
    }
  }
}
