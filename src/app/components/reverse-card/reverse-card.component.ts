import { Component } from '@angular/core';
import { ReverseStringPipe } from "../../reverse-string.pipe";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-reverse-card',
    standalone: true,
    templateUrl: './reverse-card.component.html',
    styleUrl: './reverse-card.component.css',
    imports: [ReverseStringPipe, CommonModule, FormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatSidenavModule, MatIconModule, MatToolbarModule, MatListModule, RouterLink]
})
export class ReverseCardComponent {
  inputText: string = '';
  reversedText: string = '';
  hover: boolean = false;

  constructor(private snackBar: MatSnackBar) {}

  reverseString() {
    if (this.inputText.trim() === '') {
      this.snackBar.open('Input cannot be empty!', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top'  // Set the vertical position to 'top'
      });
      return;
    }
    this.reversedText = this.inputText.split('').reverse().join('');
    this.snackBar.open('String reversed successfully!', 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      verticalPosition: 'top'  // Set the vertical position to 'top'
    });
  }

  refreshWindow(){
    window.location.reload();
  }

}
