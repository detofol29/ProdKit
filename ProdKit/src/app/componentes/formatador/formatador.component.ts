import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import formatXml from 'xml-formatter';
import { MensagemService } from '../../services/mensagem/mensagem.service';

@Component({
  selector: 'app-formatador',
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './formatador.component.html',
  styleUrl: './formatador.component.css'
})
export class FormatadorComponent {

  constructor(private mensagemService: MensagemService) {}

  TipoArquivo: string = 'json';
  textoFormatado: string = '';
  textoOriginal: string = '';

  formatar(): void {
    try{
      if(this.TipoArquivo == 'json'){
        this._formatJson();
      }
      else{
        this._formatXml();
      }
    }
    catch(erro){
      this.mensagemService.ExibirMensagem(`Digite um arquivo ${this.TipoArquivo} válido!`);
    }
  }

  _formatJson(): void {
      let content = this.textoOriginal;
      const obj = JSON.parse(content);
      let jsonFormatado = JSON.stringify(obj, null, 2); // 2 espaços de indentação
      this.textoFormatado = jsonFormatado;
  }

  _formatXml(): void {
      let content = this.textoOriginal;
      this.textoFormatado = formatXml(content, { indentation: '  ' }); // 2 espaços
  }

  copiarTextoFormatado() {
    navigator.clipboard
      .writeText(this.textoFormatado)
      .then(() => {
        this.mensagemService.ExibirMensagem('Texto copiado para a área de transferência!');
      })
      .catch(err => {
        this.mensagemService.ExibirMensagem('Falha ao copiar o texto.');
        console.error(err);
      });
  }

  aoMudarTipoArquivo(){
    this.textoOriginal = '';
    this.textoFormatado = '';
  }
}
