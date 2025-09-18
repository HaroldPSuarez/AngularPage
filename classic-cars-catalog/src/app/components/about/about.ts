import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  name: string;
  position: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {
  teamMembers: TeamMember[] = [
    {
      name: 'Carlos Rodríguez',
      position: 'Fundador y Director General',
      description: 'Más de 25 años de experiencia en vehículos clásicos deportivos. Especialista en Ferrari y Lamborghini.',
      icon: '👨‍💼'
    },
    {
      name: 'Ana María López',
      position: 'Especialista en Restauración',
      description: 'Experta en restauración de carrocerías y pintura. Certificada en técnicas de restauración europea.',
      icon: '👩‍🔧'
    },
    {
      name: 'Miguel Santos',
      position: 'Mecánico Especializado',
      description: 'Especialista en motores clásicos europeos y japoneses. 20 años de experiencia en supercars.',
      icon: '👨‍🔧'
    },
    {
      name: 'Laura Fernández',
      position: 'Asesora Comercial',
      description: 'Experta en valuación y mercado de vehículos clásicos. Certificada en tasación automotriz.',
      icon: '👩‍💼'
    }
  ];

  milestones = [
    { year: 2003, event: 'Fundación de la empresa' },
    { year: 2008, event: 'Primera restauración completa de Ferrari F40' },
    { year: 2012, event: 'Expansión a vehículos japoneses JDM' },
    { year: 2018, event: 'Certificación internacional en restauración' },
    { year: 2023, event: 'Más de 500 vehículos restaurados' }
  ];
}