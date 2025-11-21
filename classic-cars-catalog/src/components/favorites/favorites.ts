import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  isLoading = true;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth']);
      return;
    }
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.isLoading = true;
    this.apiService.getFavorites().subscribe({
      next: (response) => {
        this.favorites = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar favoritos:', error);
        this.snackBar.open('Error al cargar favoritos', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
      }
    });
  }

  removeFavorite(vehicleId: number): void {
    this.apiService.removeFavorite(vehicleId).subscribe({
      next: (response) => {
        this.snackBar.open('Eliminado de favoritos', 'Cerrar', {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
        this.loadFavorites();
      },
      error: (error) => {
        console.error('Error al eliminar favorito:', error);
        this.snackBar.open('Error al eliminar favorito', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  viewDetails(carId: number): void {
    this.router.navigate(['/car', carId]);
  }
}