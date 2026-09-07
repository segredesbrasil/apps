import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DetailComponent } from './detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Field Notes / App Gallery' },
  { path: 'apps/:slug', component: DetailComponent },
  { path: '**', redirectTo: '' }
];