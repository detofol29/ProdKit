import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { ConversorService } from '../../services/conversor/conversor.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-conversor',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './conversor.component.html',
  styleUrl: './conversor.component.css'
})
export class ConversorComponent {

  constructor(private conversorService: ConversorService) {}

  PdfParaWord = { label: 'PDF para Word', value: '0' };
  WordParaPdf = { label: 'Word para PDF', value: '1' };

  readonly TIPOS_CONVERSAO = [
    this.PdfParaWord,
    this.WordParaPdf
  ];

  arquivoCarregado: File | null = null;
  arquivoConvertido: Blob | null = null;
  conversaoSelecionada = this.TIPOS_CONVERSAO[0].value;

  aoSelecionarArquivo(event: Event): void {
    debugger;
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    const tipoConversao = this.conversaoSelecionada;

    const formatosPermitidos: { [key: string]: string[] } = {
      [parseInt(this.PdfParaWord.value)]: ['application/pdf'],
      [parseInt(this.WordParaPdf.value)]: [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]
    };

    const mensagensErro: { [key: string]: string } = {
      [parseInt(this.PdfParaWord.value)]: 'Tipo de arquivo inválido. Apenas arquivos PDF são permitidos.',
      [parseInt(this.WordParaPdf.value)]: 'Tipo de arquivo inválido. Apenas arquivos .doc ou .docx são permitidos.'
    };

    const tiposValidos = formatosPermitidos[tipoConversao] || [];

    if (!tiposValidos.includes(file.type)) {
      alert(mensagensErro[tipoConversao] || 'Tipo de arquivo inválido.');
      return;
    }

    alert('Arquivo selecionado: ' + file.name);

    this.arquivoCarregado = file;
  }

  ConverterArquivo(): void {
    debugger;
    if (!this.arquivoCarregado) {
      alert('Nenhum arquivo foi selecionado.');
      return;
    }

    this.conversorService.converterArquivo({
      arquivo: this.arquivoCarregado,
      tipoConversao: this.conversaoSelecionada
    }).subscribe(blob => {
      this.arquivoConvertido = blob;
    }, error => {
      alert('Erro ao converter o arquivo.');
      console.error(error);
    });
  }

  get tipoAceito(): string {
    switch (this.conversaoSelecionada) {
      case '0':
        return '.pdf';
      case '1':
        return '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      default:
        return '*/*';
    }
  }

  removerArquivo(): void {
    this.arquivoCarregado = null;
  }

  baixarArquivo(): void {
    if (!this.arquivoConvertido || !this.arquivoCarregado) return;

    const extensao = this.conversaoSelecionada === '0' ? 'docx' : 'pdf';
    const nomeOriginal = this.arquivoCarregado.name.split('.').slice(0, -1).join('.');
    const nomeFinal = `${nomeOriginal}_convertido.${extensao}`;

    saveAs(this.arquivoConvertido, nomeFinal);
  }
}
