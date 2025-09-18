import { Injectable } from '@angular/core';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private cars: Car[] = [
    {
      id: 1,
      name: 'Countach',
      brand: 'Lamborghini',
      year: 1985,
      decade: '80s',
      engine: 'V12 5.2L',
      horsepower: 455,
      topSpeed: '295 km/h',
      acceleration: '0-100 en 4.9s',
      price: '$150,000 - $300,000',
      description: 'Icono de los 80s con diseño futurista y puertas de tijera.',
      image: 'public/proxy-image.jpg',
      features: ['Puertas de tijera', 'Motor V12', 'Diseño angular', 'Tracción trasera'],
    },
    {
      id: 2,
      name: 'F40',
      brand: 'Ferrari',
      year: 1987,
      decade: '80s',
      engine: 'V8 2.9L Twin-Turbo',
      horsepower: 478,
      topSpeed: '324 km/h',
      acceleration: '0-100 en 4.1s',
      price: '$1,200,000 - $2,500,000',
      description: 'El último Ferrari aprobado por Enzo Ferrari, pura perfección.',
      image: 'public/proxy-image (1).jpg',
      features: ['Fibra de carbono', 'Twin-Turbo', 'Aerodinámica activa', 'Peso reducido'],
    },
    {
      id: 3,
      name: '911 Turbo',
      brand: 'Porsche',
      year: 1989,
      decade: '80s',
      engine: 'Flat-6 3.3L Turbo',
      horsepower: 330,
      topSpeed: '280 km/h',
      acceleration: '0-100 en 4.6s',
      price: '$80,000 - $150,000',
      description: 'El 911 Turbo definitivo con el icónico whale tail.',
      image: 'public/proxy-image (2).jpg',
      features: ['Motor boxer', 'Turbocompresor', 'Tracción trasera', 'Whale tail'],
    },
  ];

  getAllCars(): Car[] {
    return this.cars;
  }

  getCarById(id: number): Car | undefined {
    return this.cars.find((car) => car.id === id);
  }

  getCarsByDecade(decade: string): Car[] {
    return this.cars.filter((car) => car.decade === decade);
  }

  getCarsByBrand(brand: string): Car[] {
    return this.cars.filter((car) => car.brand === brand);
  }
}
