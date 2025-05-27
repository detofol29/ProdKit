import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { ValidadorService } from '../../services/validador/validador.service';

enum TipoDocumento {
  CPF = 'CPF',
  CNPJ = 'CNPJ',
  CEP = 'CEP'
}

@Component({
  selector: 'app-validador',
  imports: [CommonModule, FormsModule],
  templateUrl: './validador.component.html',
  styleUrl: './validador.component.css'
})
export class ValidadorComponent {

  constructor(private validadorService: ValidadorService) {}

  Conteudo: string = '';
  Tipo: TipoDocumento = TipoDocumento.CPF;
  Valido: boolean = false;
  Mensagem: string = '';
  TiposDisponiveis = Object.values(TipoDocumento);

  validar(): void {
    switch (this.Tipo) {
      case TipoDocumento.CPF:
        this.Valido = this.validarCPF(this.Conteudo);
        break;
      case TipoDocumento.CNPJ:
        this.Valido = this.validarCNPJ(this.Conteudo);
        break;
      case TipoDocumento.CEP:
        this.Valido = this.validarCEP(this.Conteudo);
        break;
    }
    this.atribuirMensagem(this.Valido);
  }

  atribuirMensagem(valido: boolean): void {
    let mesagemValido = `${this.Tipo} Válido!`;
    let mensagemInvalido = `${this.Tipo} Inválido!`;
    this.Mensagem = valido
      ? mesagemValido
      : mensagemInvalido;
  }

  aoTrocarTipo(): void {
    this.Mensagem = '';
    this.Conteudo = '';
    this.Valido = false;
  }

  validarCPF(cpf: string): boolean {
    return this.validadorService.validarCPF(cpf);
  }

  validarCNPJ(cnpj: string): boolean {
    return this.validadorService.validarCNPJ(cnpj);
  }

  validarCEP(cep: string): boolean {
    return this.validadorService.validarCEP(cep);
  }
}
