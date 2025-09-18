import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class ServicesComponent {
  services: Service[] = [
    {
      id: 1,
      title: 'Evaluación y Tasación',
      description: 'Evaluación profesional del valor de tu vehículo clásico',
      icon: '📋',
      features: [
        'Inspección completa del vehículo',
        'Verificación de documentos',
        'Análisis del mercado actual',
        'Certificado de tasación oficial'
      ],
      price: 'Desde $200.000 COP'
    },
    {
      id: 2,
      title: 'Compra y Venta',
      description: 'Intermediación segura para compra y venta de clásicos',
      icon: '🤝',
      features: [
        'Búsqueda especializada',
        'Verificación legal completa',
        'Negociación profesional',
        'Trámites incluidos'
      ],
      price: 'Comisión 5-8%'
    },
    {
      id: 3,
      title: 'Restauración',
      description: 'Restauración completa de vehículos clásicos deportivos',
      icon: '🔧',
      features: [
        'Restauración de motor',
        'Trabajo de carrocería',
        'Tapicería original',
        'Pintura profesional'
      ],
      price: 'Cotización personalizada'
    },
    {
      id: 4,
      title: 'Mantenimiento',
      description: 'Mantenimiento preventivo y correctivo especializado',
      icon: '🛠️',
      features: [
        'Mecánica especializada',
        'Repuestos originales',
        'Diagnóstico computarizado',
        'Servicio a domicilio'
      ],
      price: 'Desde $150.000 COP'
    }
  ];
}