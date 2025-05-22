import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-formatador',
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './formatador.component.html',
  styleUrl: './formatador.component.css'
})
export class FormatadorComponent {

  TipoArquivo: string = 'json';
  textoFormatado: string = '';
  textoOriginal: string = '';
  formatJson(): void {
      let content = this.textoOriginal;
      const obj = JSON.parse(content);
      let jsonFormatado = JSON.stringify(obj, null, 2); // 2 espaços de indentação
      this.textoFormatado = jsonFormatado;
  }

}
