import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConversorMoedaService, Cotacao, Resposta } from '../../services/conversorMoeda/conversor-moeda.service';

@Component({
  selector: 'app-conversor-moedas',
  imports: [FormsModule, CommonModule],
  templateUrl: './conversor-moedas.component.html',
  styleUrl: './conversor-moedas.component.css'
})
export class ConversorMoedasComponent implements OnInit {
  valor: number = 0;
  moedaOrigem: string = 'BRL';
  moedaDestino: string = 'USD';
  resultado: number | null = null;

  moedas: string[] = [
    'BRL', // Real Brasileiro
    'USD', // Dólar Americano
    'EUR', // Euro
    'GBP', // Libra Esterlina
    'JPY', // Iene Japonês
    'CHF', // Franco Suíço
    'CAD', // Dólar Canadense
    'AUD', // Dólar Australiano
    'CNY', // Yuan Chinês
    'ARS', // Peso Argentino
    'CLP', // Peso Chileno
    'MXN', // Peso Mexicano
    'ZAR', // Rand Sul-Africano
    'SEK', // Coroa Sueca
    'NOK', // Coroa Norueguesa
    'DKK', // Coroa Dinamarquesa
    'INR', // Rúpia Indiana
    'RUB', // Rublo Russo
    'KRW', // Won Sul-Coreano
    'TRY', // Lira Turca
    'ILS'  // Shekel Israelense
  ];

  constructor(private servicoDeConversaoDeMoeda: ConversorMoedaService) {}

  ngOnInit(): void {}

  converterMoeda() {
    const cotacao: Cotacao = {
      moedaOrigem: this.moedaOrigem,
      moedaDestino: this.moedaDestino,
      valor: this.valor
    };

    this.servicoDeConversaoDeMoeda.obterCotacao(cotacao).subscribe((resposta: Resposta) => {
      this.resultado = resposta.cotacao ?? 0;
    });
  }
}
