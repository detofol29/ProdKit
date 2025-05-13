import { Routes } from '@angular/router';
import { TradutorComponent } from './componentes/tradutor/tradutor.component';
import { HomeComponent } from './componentes/home/home.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'tradutor', component: TradutorComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'tradutor' }
];
