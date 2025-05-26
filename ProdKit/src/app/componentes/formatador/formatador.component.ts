import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import formatXml from 'xml-formatter';

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

  formatar(): void {
    try{
      if(this.TipoArquivo == 'json'){
        this.formatJson();
      }
      else{
        this.formatXmlContent();
      }
    }
    catch(erro){
      alert(`Digite um arquivo ${this.TipoArquivo} válido!`);
    }
  }

  formatJson(): void {
      let content = this.textoOriginal;
      const obj = JSON.parse(content);
      let jsonFormatado = JSON.stringify(obj, null, 2); // 2 espaços de indentação
      this.textoFormatado = jsonFormatado;
  }

  formatXmlContent(): void {      
      let content = this.textoOriginal;
      this.textoFormatado = formatXml(content, { indentation: '  ' }); // 2 espaços
  }

  copiarTextoFormatado() {
    navigator.clipboard
      .writeText(this.textoFormatado)
      .then(() => {
        alert('Texto copiado para a área de transferência!');
      })
      .catch(err => {
        alert('Falha ao copiar o texto.');
        console.error(err);
      });
  }
}
