import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tradutor',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './tradutor.component.html',
  styleUrl: './tradutor.component.css'
})
export class TradutorComponent {

}
