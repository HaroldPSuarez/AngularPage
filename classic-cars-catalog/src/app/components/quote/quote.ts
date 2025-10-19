import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface QuoteData {
  service: string;
  name: string;
  email: string;
  phone: string;
  carModel?: string;
  message: string;
}

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './quote.html',
  styleUrl: './quote.css'
})
export class QuoteComponent implements OnInit {
  quoteData: QuoteData = {
    service: '',
    name: '',
    email: '',
    phone: '',
    carModel: '',
    message: ''
  };

  services = [
    'Evaluación y Tasación',
    'Compra y Venta',
    'Restauración',
    'Mantenimiento',
    'Almacenamiento Seguro',
    'Asesoría de Inversión'
  ];

  isSubmitting = false;
  showSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['service']) {
        this.quoteData.service = params['service'];
      }
    });
  }

  submitQuote(): void {
    if (!this.validateForm()) {
      this.snackBar.open('Por favor completa todos los campos requeridos', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.isSubmitting = true;

    setTimeout(() => {
      console.log('Cotización enviada:', this.quoteData);
      this.isSubmitting = false;
      this.showSuccess = true;
      
      this.snackBar.open('¡Cotización enviada exitosamente! 🎉', 'Cerrar', {
        duration: 5000,
        panelClass: ['success-snackbar']
      });
    }, 2000);
  }

  validateForm(): boolean {
    return !!(
      this.quoteData.service &&
      this.quoteData.name &&
      this.quoteData.email &&
      this.quoteData.phone &&
      this.quoteData.message
    );
  }

  backToServices(): void {
    this.router.navigate(['/services']);
  }

  newQuote(): void {
    this.showSuccess = false;
    this.quoteData = {
      service: '',
      name: '',
      email: '',
      phone: '',
      carModel: '',
      message: ''
    };
  }
}