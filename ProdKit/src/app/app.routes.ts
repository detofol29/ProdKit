import { Routes } from '@angular/router';
import { TradutorComponent } from './componentes/tradutor/tradutor.component';
import { HomeComponent } from './componentes/home/home.component';
import { GeradorComponent } from './componentes/gerador/gerador.component';
import { FormatadorComponent } from './componentes/formatador/formatador.component';
import { ValidadorComponent } from './componentes/validador/validador.component';
import { ExtratorComponent } from './componentes/extrator/extrator.component';
import { ConversorComponent } from './componentes/conversor/conversor.component';
import { GeradorWhatsappComponent } from './componentes/gerador-whatsapp/gerador-whatsapp.component';
import { CalculadoraJurosCompostosComponent } from './componentes/calculadora-juros-compostos/calculadora-juros-compostos.component';
import { ContadorComponent } from './componentes/contador/contador.component';
import { ConversorDeUnidadesComponent } from './componentes/conversor-de-unidades/conversor-de-unidades.component';
import { ConversorMoedasComponent } from './componentes/conversor-moedas/conversor-moedas.component';
import { ExtratorDeTextoComponent } from './componentes/extrator-de-texto/extrator-de-texto.component';
import { SobreComponent } from './componentes/sobre/sobre.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'tradutor', component: TradutorComponent },
  { path: 'home', component: HomeComponent },
  { path: 'gerador', component: GeradorComponent },
  { path: 'formatador', component: FormatadorComponent },
  { path: 'validador', component: ValidadorComponent },
  { path: 'extrator', component: ExtratorComponent },
  { path: 'conversor', component: ConversorComponent },
  { path: 'whatsapp', component: GeradorWhatsappComponent },
  { path: 'calculadorajuroscompostos', component: CalculadoraJurosCompostosComponent },
  { path: 'contador', component: ContadorComponent},
  { path: 'conversordeunidades', component: ConversorDeUnidadesComponent},
  { path: 'conversormoedas', component: ConversorMoedasComponent},
  { path: 'extratordetexto', component: ExtratorDeTextoComponent},
  { path: 'sobre', component: SobreComponent},
  { path: '**', redirectTo: 'home' }
];
