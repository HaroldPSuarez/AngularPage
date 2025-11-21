import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Contactos
  sendContact(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/contacts`, data);
  }

  getContacts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/contacts`);
  }

  // Cotizaciones
  sendQuote(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/quotes`, data);
  }

  getQuotes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/quotes`);
  }

  // Newsletter
  subscribeNewsletter(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/newsletter/subscribe`, { email });
  }

  // Vehículos
  getVehicles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vehicles`);
  }

  getVehicle(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/vehicles/${id}`);
  }

  // Favoritos
  getFavorites(): Observable<any> {
    return this.http.get(`${this.apiUrl}/favorites`, { headers: this.getHeaders() });
  }

  addFavorite(vehicleId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/favorites`,
      { vehicleId },
      { headers: this.getHeaders() }
    );
  }

  removeFavorite(vehicleId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/favorites/${vehicleId}`,
      { headers: this.getHeaders() }
    );
  }

  checkFavorite(vehicleId: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/favorites/check/${vehicleId}`,
      { headers: this.getHeaders() }
    );
  }
}