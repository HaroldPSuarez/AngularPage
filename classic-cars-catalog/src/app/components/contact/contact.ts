import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Contact {
  name: string;
  email: string;
  phone: string;
  message: string;
  interestedCar?: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent implements OnInit {
  contact: Contact = {
    name: '',
    email: '',
    phone: '',
    message: '',
    interestedCar: ''
  };
  
  isSubmitting = false;
  isSubmitted = false;
  errors: { [key: string]: string } = {};

  ngOnInit(): void {}

  validateForm(): boolean {
    this.errors = {};

    if (!this.contact.name.trim()) {
      this.errors['name'] = 'El nombre es requerido';
    }

    if (!this.contact.email.trim()) {
      this.errors['email'] = 'El email es requerido';
    } else if (!this.isValidEmail(this.contact.email)) {
      this.errors['email'] = 'El email no es válido';
    }

    if (!this.contact.phone.trim()) {
      this.errors['phone'] = 'El teléfono es requerido';
    }

    if (!this.contact.message.trim()) {
      this.errors['message'] = 'El mensaje es requerido';
    }

    return Object.keys(this.errors).length === 0;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;

    setTimeout(() => {
      console.log('Contacto enviado:', this.contact);
      this.isSubmitted = true;
      this.resetForm();
      this.isSubmitting = false;
    }, 1000);
  }

  resetForm(): void {
    this.contact = {
      name: '',
      email: '',
      phone: '',
      message: '',
      interestedCar: this.contact.interestedCar
    };
    this.errors = {};
  }

  resetSubmission(): void {
    this.isSubmitted = false;
  }
}