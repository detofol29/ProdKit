import { Routes } from '@angular/router';
import { TradutorComponent } from './componentes/tradutor/tradutor.component';
import { HomeComponent } from './componentes/home/home.component';
import { GeradorComponent } from './componentes/gerador/gerador.component';
import { FormatadorComponent } from './componentes/formatador/formatador.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'tradutor', component: TradutorComponent },
  { path: 'home', component: HomeComponent },
  { path: 'gerador', component: GeradorComponent },
  { path: 'formatador', component: FormatadorComponent },
  { path: '**', redirectTo: 'home' }
];
