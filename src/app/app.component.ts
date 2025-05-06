import { Component } from '@angular/core';
import {SidebarComponent} from './componentes/sidebar/sidebar.component';
import { TradutorComponent } from './componentes/tradutor/tradutor.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, TradutorComponent, RouterModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProdKit';
}
