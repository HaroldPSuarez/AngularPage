import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Catalog } from './components/catalog/catalog';
import { CarDetail } from './components/car-detail/car-detail';
import { Contact } from './components/contact/contact';
import { Services } from './components/services/services';
import { About } from './components/about/about';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: Catalog },
  { path: 'car/:id', component: CarDetail },
  { path: 'contact', component: Contact },
  { path: 'services', component: Services },
  { path: 'about', component: About },
  { path: '', redirectTo: '' },
];
