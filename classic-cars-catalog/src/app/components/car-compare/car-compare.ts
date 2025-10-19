import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

interface Car {
  id: number;
  name: string;
  brand: string;
  year: number;
  engine: string;
  horsepower: number;
  topSpeed: string;
  acceleration: string;
  price: string;
  image: string;
}

@Component({
  selector: 'app-car-compare',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './car-compare.html',
  styleUrl: './car-compare.css'
})
export class CarCompareComponent {
  availableCars: Car[] = [
    {
      id: 1, name: 'Countach', brand: 'Lamborghini', year: 1985,
      engine: 'V12 5.2L', horsepower: 455, topSpeed: '295 km/h',
      acceleration: '0-100 en 4.9s', price: '$150,000 - $300,000',
      image: 'public/proxy-image.jpg'
    },
    {
      id: 2, name: 'F40', brand: 'Ferrari', year: 1987,
      engine: 'V8 2.9L Twin-Turbo', horsepower: 478, topSpeed: '324 km/h',
      acceleration: '0-100 en 4.1s', price: '$1,200,000 - $2,500,000',
      image: 'public/proxy-image (1).jpg'
    },
    {
      id: 3, name: '911 Turbo', brand: 'Porsche', year: 1989,
      engine: 'Flat-6 3.3L Turbo', horsepower: 330, topSpeed: '280 km/h',
      acceleration: '0-100 en 4.6s', price: '$80,000 - $150,000',
      image: 'public/proxy-image (2).jpg'
    },
    {
      id: 4, name: 'F1', brand: 'McLaren', year: 1992,
      engine: 'V12 6.1L BMW', horsepower: 627, topSpeed: '386 km/h',
      acceleration: '0-100 en 3.2s', price: '$15,000,000+',
      image: 'assets/images/f1.jpg'
    },
    {
      id: 5, name: 'Supra MK4', brand: 'Toyota', year: 1993,
      engine: 'Inline-6 3.0L Twin-Turbo', horsepower: 330, topSpeed: '250 km/h',
      acceleration: '0-100 en 4.9s', price: '$40,000 - $200,000',
      image: 'assets/images/supra.jpg'
    },
    {
      id: 6, name: 'Viper GTS', brand: 'Dodge', year: 1996,
      engine: 'V10 8.0L', horsepower: 450, topSpeed: '300 km/h',
      acceleration: '0-100 en 4.0s', price: '$60,000 - $120,000',
      image: 'assets/images/viper.jpg'
    }
  ];

  selectedCarId1: number | null = null;
  selectedCarId2: number | null = null;
  selectedCarId3: number | null = null;

  get selectedCars(): Car[] {
    const cars: Car[] = [];
    
    if (this.selectedCarId1) {
      const car = this.availableCars.find(c => c.id === this.selectedCarId1);
      if (car) cars.push(car);
    }
    
    if (this.selectedCarId2) {
      const car = this.availableCars.find(c => c.id === this.selectedCarId2);
      if (car) cars.push(car);
    }
    
    if (this.selectedCarId3) {
      const car = this.availableCars.find(c => c.id === this.selectedCarId3);
      if (car) cars.push(car);
    }
    
    return cars;
  }

  get displayedColumns(): string[] {
    return ['image', 'year', 'engine', 'horsepower', 'topSpeed', 'acceleration', 'price'];
  }

  getWinner(attribute: 'horsepower' | 'year'): Car | null {
    if (this.selectedCars.length === 0) return null;
    
    if (attribute === 'horsepower') {
      return this.selectedCars.reduce((max, car) => 
        car.horsepower > max.horsepower ? car : max
      );
    } else {
      return this.selectedCars.reduce((newest, car) => 
        car.year > newest.year ? car : newest
      );
    }
  }

  isWinner(car: Car, attribute: 'horsepower' | 'year'): boolean {
    const winner = this.getWinner(attribute);
    return winner?.id === car.id;
  }

  removeCar(position: number): void {
    if (position === 1) this.selectedCarId1 = null;
    if (position === 2) this.selectedCarId2 = null;
    if (position === 3) this.selectedCarId3 = null;
  }
}