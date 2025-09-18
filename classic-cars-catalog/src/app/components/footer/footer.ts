import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  socialLinks = [
    { name: 'Facebook', icon: '📘', url: 'https://facebook.com' },
    { name: 'Instagram', icon: '📷', url: 'https://instagram.com' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
    { name: 'YouTube', icon: '📺', url: 'https://youtube.com' }
  ];

  quickLinks = [
    { name: 'Inicio', route: '/' },
    { name: 'Catálogo', route: '/catalog' },
    { name: 'Servicios', route: '/services' },
    { name: 'Nosotros', route: '/about' },
    { name: 'Contacto', route: '/contact' }
  ];

  serviceLinks = [
    { name: 'Compra-Venta', route: '/services' },
    { name: 'Evaluaciones', route: '/services' },
    { name: 'Restauración', route: '/services' },
    { name: 'Mantenimiento', route: '/services' }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  openSocialLink(url: string): void {
    window.open(url, '_blank');
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}