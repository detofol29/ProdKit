import { Component } from '@angular/core';
import {SidebarComponent} from './componentes/sidebar/sidebar.component';
import { TradutorComponent } from './componentes/tradutor/tradutor.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { NavBarMobileComponent } from './componentes/nav-bar-mobile/nav-bar-mobile.component';
import { GeradorComponent } from './componentes/gerador/gerador.component';
import { FormatadorComponent } from './componentes/formatador/formatador.component';
import { ValidadorComponent } from './componentes/validador/validador.component';
import { ExtratorComponent } from './componentes/extrator/extrator.component';
import { ConversorComponent } from './componentes/conversor/conversor.component';
import { GeradorWhatsappComponent } from './componentes/gerador-whatsapp/gerador-whatsapp.component';
import { DialogAlertaComponent } from './componentes/dialog-alerta/dialog-alerta.component';
import { CalculadoraJurosCompostosComponent } from './componentes/calculadora-juros-compostos/calculadora-juros-compostos.component';
import { ContadorComponent } from './componentes/contador/contador.component';
import { ConversorDeUnidadesComponent } from './componentes/conversor-de-unidades/conversor-de-unidades.component';
import { ConversorMoedasComponent } from './componentes/conversor-moedas/conversor-moedas.component';
import { ExtratorDeTextoComponent } from './componentes/extrator-de-texto/extrator-de-texto.component';
import { SobreComponent } from './componentes/sobre/sobre.component';

@Component({
  selector: 'app-root',
  imports: [
    SidebarComponent,
    TradutorComponent,
    RouterModule,
    HomeComponent,
    NavBarMobileComponent,
    GeradorComponent,
    FormatadorComponent,
    ValidadorComponent,
    ExtratorComponent,
    ConversorComponent,
    GeradorWhatsappComponent,
    DialogAlertaComponent,
    CalculadoraJurosCompostosComponent,
    ContadorComponent,
    ConversorDeUnidadesComponent,
    ConversorMoedasComponent,
    ExtratorDeTextoComponent,
    SobreComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProdKit';

}
