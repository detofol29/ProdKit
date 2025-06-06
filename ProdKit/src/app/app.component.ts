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
    ExtratorComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProdKit';

}
