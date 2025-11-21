import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyFormatPipe } from '../../pipes/currency-format-pipe';
import { HighlightPipe } from '../../pipes/highlight-pipe';
import { AuthService } from '../../../services/auth';
import { ApiService } from '../../../services/api';

interface Car {
  id: number;
  name: string;
  brand: string;
  year: number;
  decade: string;
  engine: string;
  horsepower: number;
  topSpeed: string;
  price: string;
  image: string;
}

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    CurrencyFormatPipe, 
    HighlightPipe,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class CatalogComponent implements OnInit {
  cars: Car[] = [
    {
      id: 1, name: 'Countach', brand: 'Lamborghini', year: 1985, decade: '80s',
      engine: 'V12 5.2L', horsepower: 455, topSpeed: '295 km/h',
      price: '$150,000 - $300,000', image: 'public/proxy-image.jpg'
    },
    {
      id: 2, name: 'F40', brand: 'Ferrari', year: 1987, decade: '80s',
      engine: 'V8 2.9L Twin-Turbo', horsepower: 478, topSpeed: '324 km/h',
      price: '$1,200,000 - $2,500,000', image: 'public/proxy-image (1).jpg'
    },
    {
      id: 3, name: '911 Turbo', brand: 'Porsche', year: 1989, decade: '80s',
      engine: 'Flat-6 3.3L Turbo', horsepower: 330, topSpeed: '280 km/h',
      price: '$80,000 - $150,000', image: 'public/proxy-image (2).jpg'
    },
    {
      id: 4, name: 'F1', brand: 'McLaren', year: 1992, decade: '90s',
      engine: 'V12 6.1L BMW', horsepower: 627, topSpeed: '386 km/h',
      price: '$15,000,000+', image: 'assets/images/f1.jpg'
    },
    {
      id: 5, name: 'Supra MK4', brand: 'Toyota', year: 1993, decade: '90s',
      engine: 'Inline-6 3.0L Twin-Turbo', horsepower: 330, topSpeed: '250 km/h',
      price: '$40,000 - $200,000', image: 'assets/images/supra.jpg'
    },
    {
      id: 6, name: 'Viper GTS', brand: 'Dodge', year: 1996, decade: '90s',
      engine: 'V10 8.0L', horsepower: 450, topSpeed: '300 km/h',
      price: '$60,000 - $120,000', image: 'assets/images/viper.jpg'
    }
  ];

  filteredCars: Car[] = [];
  selectedDecade = '';
  selectedBrand = '';
  searchTerm = '';
  
  decades = ['80s', '90s', '2000s'];
  brands: string[] = [];
  
  favoriteStatus: { [key: number]: boolean } = {};

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.filteredCars = [...this.cars];
    this.brands = [...new Set(this.cars.map(car => car.brand))].sort();
    
    // Cargar estado de favoritos si está logueado
    if (this.authService.isLoggedIn()) {
      this.loadFavoriteStatus();
    }
  }

  loadFavoriteStatus(): void {
    this.apiService.getFavorites().subscribe({
      next: (response) => {
        // Marcar los favoritos del usuario
        response.data.forEach((fav: any) => {
          this.favoriteStatus[fav.id] = true;
        });
      },
      error: (error) => {
        console.error('Error al cargar favoritos:', error);
      }
    });
  }

  filterCars(): void {
    this.filteredCars = this.cars.filter(car => {
      const matchesDecade = !this.selectedDecade || car.decade === this.selectedDecade;
      const matchesBrand = !this.selectedBrand || car.brand === this.selectedBrand;
      const matchesSearch = !this.searchTerm || 
        car.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchesDecade && matchesBrand && matchesSearch;
    });
  }

  resetFilters(): void {
    this.selectedDecade = '';
    this.selectedBrand = '';
    this.searchTerm = '';
    this.filteredCars = [...this.cars];
  }

  toggleFavorite(carId: number, event: Event): void {
    event.stopPropagation();
    
    if (!this.authService.isLoggedIn()) {
      this.snackBar.open('Debes iniciar sesión para guardar favoritos', 'Login', {
        duration: 3000,
        panelClass: ['error-snackbar']
      }).onAction().subscribe(() => {
        this.router.navigate(['/auth']);
      });
      return;
    }

    if (this.favoriteStatus[carId]) {
      // Eliminar de favoritos
      this.apiService.removeFavorite(carId).subscribe({
        next: () => {
          this.favoriteStatus[carId] = false;
          this.snackBar.open('Eliminado de favoritos', 'Cerrar', {
            duration: 2000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          console.error('Error al eliminar favorito:', error);
          this.snackBar.open('Error al eliminar favorito', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      // Agregar a favoritos
      this.apiService.addFavorite(carId).subscribe({
        next: () => {
          this.favoriteStatus[carId] = true;
          this.snackBar.open('¡Agregado a favoritos! ❤️', 'Ver', {
            duration: 2000,
            panelClass: ['success-snackbar']
          }).onAction().subscribe(() => {
            this.router.navigate(['/favorites']);
          });
        },
        error: (error) => {
          console.error('Error al agregar favorito:', error);
          this.snackBar.open('Error al agregar favorito', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  isFavorite(carId: number): boolean {
    return this.favoriteStatus[carId] || false;
  }

  viewCarDetail(carId: number): void {
    this.router.navigate(['/car', carId]);
  }
}