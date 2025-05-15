import { Component } from '@angular/core';
import {SidebarComponent} from './componentes/sidebar/sidebar.component';
import { TradutorComponent } from './componentes/tradutor/tradutor.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { NavBarMobileComponent } from './componentes/nav-bar-mobile/nav-bar-mobile.component';
import { GeradorComponent } from './componentes/gerador/gerador.component';

@Component({
  selector: 'app-root',
  imports: [
    SidebarComponent,
    TradutorComponent,
    RouterModule,
    HomeComponent,
    NavBarMobileComponent,
    GeradorComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProdKit';

}
