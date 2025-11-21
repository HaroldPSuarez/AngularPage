import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogComponent } from './components/catalog/catalog';
import { ServicesComponent } from './components/services/services';
import { AboutComponent } from './components/about/about';
import { ContactComponent } from './components/contact/contact';
import { QuoteComponent } from './components/quote/quote';
import { CarCompareComponent } from './components/car-compare/car-compare';
import { AuthComponent } from '../components/auth/auth';
import { FavoritesComponent } from '../components/favorites/favorites';
import { AdminDashboardComponent } from '../components/admin-dashboard/admin-dashboard';


export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    title: 'Inicio - Classic Cars Catalog'
  },
  { 
    path: 'catalog', 
    component: CatalogComponent,
    title: 'Catálogo - Classic Cars'
  },
  { 
    path: 'compare', 
    component: CarCompareComponent,
    title: 'Comparador - Classic Cars'
  },
  { 
    path: 'services', 
    component: ServicesComponent,
    title: 'Servicios - Classic Cars'
  },
  { 
    path: 'about', 
    component: AboutComponent,
    title: 'Nosotros - Classic Cars'
  },
  { 
    path: 'contact', 
    component: ContactComponent,
    title: 'Contacto - Classic Cars'
  },
  { 
    path: 'quote', 
    component: QuoteComponent,
    title: 'Cotización - Classic Cars'
  },
  { 
    path: 'auth', 
    component: AuthComponent,
    title: 'Login - Classic Cars'
  },
  { 
    path: 'favorites', 
    component: FavoritesComponent,
    title: 'Mis Favoritos - Classic Cars'
  },
  { 
    path: 'admin', 
    component: AdminDashboardComponent,
    title: 'Dashboard Admin - Classic Cars'
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];