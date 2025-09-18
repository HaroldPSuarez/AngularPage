import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogComponent } from './components/catalog/catalog';
import { CarDetailComponent } from './components/car-detail/car-detail';
import { ContactComponent } from './components/contact/contact';
import { ServicesComponent } from './components/services/services';
import { AboutComponent } from './components/about/about';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'car/:id', component: CarDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' },
];
