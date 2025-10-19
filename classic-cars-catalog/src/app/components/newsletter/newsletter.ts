import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './newsletter.html',
  styleUrl: './newsletter.css'
})
export class NewsletterComponent {
  email = '';
  isSubmitting = false;

  constructor(private snackBar: MatSnackBar) {}

  subscribe(): void {
    if (!this.isValidEmail(this.email)) {
      this.snackBar.open('Por favor ingresa un email válido', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.isSubmitting = true;

    setTimeout(() => {
      console.log('Suscripción:', this.email);
      this.snackBar.open('¡Suscripción exitosa! 🎉', 'Cerrar', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
      this.email = '';
      this.isSubmitting = false;
    }, 1000);
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}