import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogComponent } from './components/catalog/catalog';
import { ServicesComponent } from './components/services/services';
import { AboutComponent } from './components/about/about';
import { ContactComponent } from './components/contact/contact';
import { QuoteComponent } from './components/quote/quote';
import { CarCompareComponent } from './components/car-compare/car-compare';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'quote', component: QuoteComponent },
  { path: 'compare', component: CarCompareComponent },
  { path: '**', redirectTo: '' }
];