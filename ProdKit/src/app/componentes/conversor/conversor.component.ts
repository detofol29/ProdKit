import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { ConversorService } from '../../services/conversor/conversor.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-conversor',
  imports: [CommonModule,
    RouterModule,
    FormsModule,],
  templateUrl: './conversor.component.html',
  styleUrl: './conversor.component.css'
})
export class ConversorComponent {

  constructor(private conversorService: ConversorService) {}

  PdfParaWord = { label: 'PDF para Word', value: 'PdfToWord' };
  WordParaPdf = { label: 'Word para PDF', value: 'WordToPdf' };

  readonly TIPOS_CONVERSAO = [
    this.PdfParaWord,
    this.WordParaPdf
  ];

  arquivoCarregado: File | null = null;
  arquivoConvertido: string | null = null;
  conversaoSelecionada = this.TIPOS_CONVERSAO[0].value;

  aoSelecionarArquivo(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    const tipoConversao = this.conversaoSelecionada;

    const formatosPermitidos: { [key: string]: string[] } = {
      PdfToWord: ['application/pdf'],
      WordToPdf: [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]
    };

    const mensagensErro: { [key: string]: string } = {
      PdfToWord: 'Tipo de arquivo inválido. Apenas arquivos PDF são permitidos.',
      WordToPdf: 'Tipo de arquivo inválido. Apenas arquivos .doc ou .docx são permitidos.'
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
    this.conversorService.converterArquivo({ arquivo: this.arquivoCarregado as File, tipoConversao: this.conversaoSelecionada })
    .subscribe(blob => {
      debugger;
      this.arquivoConvertido = URL.createObjectURL(blob);
    });
  }

  get tipoAceito(): string {
    switch (this.conversaoSelecionada) {
      case 'PdfToWord':
        return '.pdf';
      case 'WordToPdf':
        return '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      default:
        return '*/*';
    }
  }

  removerArquivo(): void {
    this.arquivoCarregado = null;
  }

}
