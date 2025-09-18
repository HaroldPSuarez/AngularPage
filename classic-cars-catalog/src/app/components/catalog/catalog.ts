import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
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

  ngOnInit(): void {
    this.filteredCars = [...this.cars];
    this.brands = [...new Set(this.cars.map(car => car.brand))].sort();
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
}