import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  featuredCars: Car[] = [];
  currentYear = new Date().getFullYear();

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {
    const allCars = this.carService.getAllCars();
    this.featuredCars = allCars.slice(0, 3);
  }

  viewCatalog(): void {
    this.router.navigate(['/catalog']);
  }

  viewCarDetail(carId: number): void {
    this.router.navigate(['/car', carId]);
  }
}
