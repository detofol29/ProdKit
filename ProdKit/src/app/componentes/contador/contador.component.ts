import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contador',
  imports: [FormsModule],
  templateUrl: './contador.component.html',
  styleUrl: './contador.component.css'
})
export class ContadorComponent {
  texto: string = '';

  contarPalavras(texto: string): number {
    return texto.trim().length > 0
      ? texto.trim().split(/\s+/).length
      : 0;
  }

  contarLinhas(texto: string): number {
    return texto.length > 0
      ? texto.split(/\r\n|\r|\n/).length
      : 0;
  }

}
