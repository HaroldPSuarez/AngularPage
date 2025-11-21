import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    totalContacts: 0,
    totalQuotes: 0,
    totalVehicles: 0,
    pendingQuotes: 0
  };

  contacts: any[] = [];
  quotes: any[] = [];
  
  contactColumns = ['name', 'email', 'phone', 'created_at'];
  quoteColumns = ['name', 'service', 'email', 'status', 'created_at'];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Cargar contactos
    this.apiService.getContacts().subscribe({
      next: (response) => {
        this.contacts = response.data;
        this.stats.totalContacts = this.contacts.length;
      },
      error: (error) => console.error('Error al cargar contactos:', error)
    });

    // Cargar cotizaciones
    this.apiService.getQuotes().subscribe({
      next: (response) => {
        this.quotes = response.data;
        this.stats.totalQuotes = this.quotes.length;
        this.stats.pendingQuotes = this.quotes.filter(q => q.status === 'pending').length;
      },
      error: (error) => console.error('Error al cargar cotizaciones:', error)
    });

    // Cargar vehículos
    this.apiService.getVehicles().subscribe({
      next: (response) => {
        this.stats.totalVehicles = response.data.length;
      },
      error: (error) => console.error('Error al cargar vehículos:', error)
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('es-ES');
  }
}