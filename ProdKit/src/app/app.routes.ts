import { Routes } from '@angular/router';
import { TradutorComponent } from './componentes/tradutor/tradutor.component';
import { HomeComponent } from './componentes/home/home.component';
import { GeradorComponent } from './componentes/gerador/gerador.component';
import { FormatadorComponent } from './componentes/formatador/formatador.component';
import { ValidadorComponent } from './componentes/validador/validador.component';
import { ExtratorComponent } from './componentes/extrator/extrator.component';
import { ConversorComponent } from './componentes/conversor/conversor.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'tradutor', component: TradutorComponent },
  { path: 'home', component: HomeComponent },
  { path: 'gerador', component: GeradorComponent },
  { path: 'formatador', component: FormatadorComponent },
  { path: 'validador', component: ValidadorComponent },
  { path: 'extrator', component: ExtratorComponent },
  { path: 'conversor', component: ConversorComponent},
  { path: '**', redirectTo: 'home' }
];
