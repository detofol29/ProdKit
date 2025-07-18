import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConversorMoedaService, Cotacao, Resposta } from '../../services/conversorMoeda/conversor-moeda.service';
import { MensagemService } from '../../services/mensagem/mensagem.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-conversor-moedas',
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './conversor-moedas.component.html',
  styleUrl: './conversor-moedas.component.css'
})
export class ConversorMoedasComponent implements OnInit {

  public readonly moedas = [
    { codigo: 'BRL', nome: 'Real Brasileiro', bandeiraUrl: 'https://flagcdn.com/br.svg' },
    { codigo: 'USD', nome: 'Dólar Americano', bandeiraUrl: 'https://flagcdn.com/w40/us.png' },
    { codigo: 'EUR', nome: 'Euro', bandeiraUrl: 'https://flagcdn.com/w40/eu.png' },
    { codigo: 'GBP', nome: 'Libra Esterlina', bandeiraUrl: 'https://flagcdn.com/w40/gb.png' },
    { codigo: 'JPY', nome: 'Iene Japonês', bandeiraUrl: 'https://flagcdn.com/w40/jp.png' },
    { codigo: 'CHF', nome: 'Franco Suíço', bandeiraUrl: 'https://flagcdn.com/w40/ch.png' },
    { codigo: 'CAD', nome: 'Dólar Canadense', bandeiraUrl: 'https://flagcdn.com/w40/ca.png' },
    { codigo: 'AUD', nome: 'Dólar Australiano', bandeiraUrl: 'https://flagcdn.com/w40/au.png' },
    { codigo: 'CNY', nome: 'Yuan Chinês', bandeiraUrl: 'https://flagcdn.com/w40/cn.png' },
    { codigo: 'ARS', nome: 'Peso Argentino', bandeiraUrl: 'https://flagcdn.com/w40/ar.png' },
    { codigo: 'CLP', nome: 'Peso Chileno', bandeiraUrl: 'https://flagcdn.com/w40/cl.png' },
    { codigo: 'MXN', nome: 'Peso Mexicano', bandeiraUrl: 'https://flagcdn.com/w40/mx.png' },
    { codigo: 'ZAR', nome: 'Rand Sul-Africano', bandeiraUrl: 'https://flagcdn.com/w40/za.png' },
    { codigo: 'SEK', nome: 'Coroa Sueca', bandeiraUrl: 'https://flagcdn.com/w40/se.png' },
    { codigo: 'NOK', nome: 'Coroa Norueguesa', bandeiraUrl: 'https://flagcdn.com/w40/no.png' },
    { codigo: 'DKK', nome: 'Coroa Dinamarquesa', bandeiraUrl: 'https://flagcdn.com/w40/dk.png' },
    { codigo: 'INR', nome: 'Rúpia Indiana', bandeiraUrl: 'https://flagcdn.com/w40/in.png' },
    { codigo: 'RUB', nome: 'Rublo Russo', bandeiraUrl: 'https://flagcdn.com/w40/ru.png' },
    { codigo: 'KRW', nome: 'Won Sul-Coreano', bandeiraUrl: 'https://flagcdn.com/w40/kr.png' },
    { codigo: 'TRY', nome: 'Lira Turca', bandeiraUrl: 'https://flagcdn.com/w40/tr.png' },
    { codigo: 'ILS', nome: 'Shekel Israelense', bandeiraUrl: 'https://flagcdn.com/w40/il.png' }
  ];

  valor: number = 0;
  moedaOrigem: string = this.moedas[0].codigo;
  moedaDestino: string = this.moedas[1].codigo;
  resultado: number | null = null;
  bandeiraDestinoUrl: string = this.moedas[1].bandeiraUrl || '';
  bandeiraOrigemUrl: string = this.moedas[0].bandeiraUrl || '';

  // Constantes
  MENSAGEM_MOEDAS_IGUAIS: string = 'As moedas de origem e destino são iguais.';
  MENSAGEM_VALOR_ZERO: string = 'Valor não informado para conversão.';
  ZERO: number = 0;

  constructor(private servicoDeConversaoDeMoeda: ConversorMoedaService,
     private mensagemService: MensagemService) {}

  ngOnInit(): void {}

  converterMoeda() {
    const cotacao: Cotacao = {
      moedaOrigem: this.moedaOrigem,
      moedaDestino: this.moedaDestino,
      valor: this.valor
    };

    if(cotacao.valor == this.ZERO) {
      this.mensagemService.ExibirMensagem(this.MENSAGEM_VALOR_ZERO);
      return;
    }

    if(cotacao.moedaOrigem === cotacao.moedaDestino) {
      this.resultado = cotacao.valor ?? this.ZERO;
      this.mensagemService.ExibirMensagem(this.MENSAGEM_MOEDAS_IGUAIS);
      return;
    }

    this.servicoDeConversaoDeMoeda.obterCotacao(cotacao).subscribe((resposta: Resposta) => {
      if(resposta.erro)
        this.mensagemService.ExibirMensagem(resposta.erro);
      else
        this.resultado = resposta.cotacao ?? this.ZERO;
    });
  }

  aoAlterarMoedaOrigem() {
    this.bandeiraOrigemUrl = this.moedas.find(m => m.codigo === this.moedaOrigem)?.bandeiraUrl || '';
  }

  aoAlterarMoedaDestino() {
    this.bandeiraDestinoUrl = this.moedas.find(m => m.codigo === this.moedaDestino)?.bandeiraUrl || '';
  }
}
