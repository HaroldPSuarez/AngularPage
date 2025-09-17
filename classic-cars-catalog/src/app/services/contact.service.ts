import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [];

  submitContact(contact: Contact): boolean {
    try {
      this.contacts.push(contact);
      console.log('Contacto enviado:', contact);
      return true;
    } catch (error) {
      console.error('Error al enviar contacto:', error);
      return false;
    }
  }

  getAllContacts(): Contact[] {
    return this.contacts;
  }
}
