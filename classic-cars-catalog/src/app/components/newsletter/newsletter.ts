import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../../services/api';


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

  constructor(
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) {}

  subscribe(): void {
    if (!this.isValidEmail(this.email)) {
      this.snackBar.open('Por favor ingresa un email válido', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.isSubmitting = true;

    // Enviar al backend
    this.apiService.subscribeNewsletter(this.email).subscribe({
      next: (response) => {
        console.log('Suscripción exitosa:', response);
        this.snackBar.open('¡Suscripción exitosa! 🎉', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.email = '';
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error en suscripción:', error);
        this.snackBar.open('Error al suscribirse. Por favor intenta de nuevo.', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.isSubmitting = false;
      }
    });
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}