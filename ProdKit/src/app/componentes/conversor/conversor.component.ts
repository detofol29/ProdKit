import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConversorService } from '../../services/conversor/conversor.service';
import { saveAs } from 'file-saver';
import { MensagemService } from '../../services/mensagem/mensagem.service';

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

  constructor(private conversorService: ConversorService, private mensagemService: MensagemService) {}

  //Constantes
  MensagemNenhumArquivoSelecionado = 'Nenhum arquivo foi selecionado.';
  MensagemArquivoInvalidoPdf = 'Tipo de arquivo inválido. Apenas arquivos PDF são permitidos.';
  MensagemArquivoInvalidoWord = 'Tipo de arquivo inválido. Apenas arquivos .doc ou .docx são permitidos.';
  MensagemTipoDeArquivoInvalido = 'Tipo de arquivo inválido.';
  MensagemErroAoConverter = 'Erro ao converter o arquivo.';
  ExtensaoPdf = '.pdf';
  ExtensaoWord = '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  //

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
      [parseInt(this.PdfParaWord.value)]: this.MensagemArquivoInvalidoPdf,
      [parseInt(this.WordParaPdf.value)]: this.MensagemArquivoInvalidoWord
    };

    const tiposValidos = formatosPermitidos[tipoConversao] || [];

    if (!tiposValidos.includes(file.type)) {
      this.mensagemService.ExibirMensagem(mensagensErro[tipoConversao] || this.MensagemTipoDeArquivoInvalido);
      return;
    }

    let mensagemArquivoSelecionado = 'Arquivo selecionado: ' + file.name;
    this.mensagemService.ExibirMensagem(mensagemArquivoSelecionado);

    this.arquivoCarregado = file;
  }

  ConverterArquivo(): void {

    if (!this.arquivoCarregado) {
      this.mensagemService.ExibirMensagem(this.MensagemNenhumArquivoSelecionado);
      return;
    }

    this.mensagemService.ExibirMensagem("Serviço indisponível no momento!");
    return;

    // this.conversorService.converterArquivo({
    //   arquivo: this.arquivoCarregado,
    //   tipoConversao: this.conversaoSelecionada
    // }).subscribe(blob => {
    //   this.arquivoConvertido = blob;
    // }, error => {
    //   this.mensagemService.ExibirMensagem(this.MensagemErroAoConverter);
    //   console.error(error);
    // });
  }

  get tipoAceito(): string {
    switch (this.conversaoSelecionada) {
      case this.PdfParaWord.value:
        return this.ExtensaoPdf;
      case this.WordParaPdf.value:
        return this.ExtensaoWord;
      default:
        return '*/*';
    }
  }

  removerArquivo(): void {
    this.arquivoCarregado = null;
  }

  baixarArquivo(): void {
    if (!this.arquivoConvertido || !this.arquivoCarregado) return;

    const extensao = this.conversaoSelecionada === this.PdfParaWord.value
      ? 'docx'
      : 'pdf';
    const nomeOriginal = this.arquivoCarregado.name.split('.').slice(0, -1).join('.');
    const nomeFinal = `${nomeOriginal}_convertido.${extensao}`;

    saveAs(this.arquivoConvertido, nomeFinal);
  }
}
