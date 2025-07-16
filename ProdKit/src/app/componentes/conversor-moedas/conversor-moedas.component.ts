import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConversorMoedaService } from '../../services/conversorMoeda/conversor-moeda.service';

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

  moedas: string[] = ['BRL', 'USD', 'EUR', 'GBP', 'JPY', 'ARS'];

  constructor(private servicoDeConversaoDeMoeda: ConversorMoedaService) {}

  ngOnInit(): void {}

  converterMoeda() {
    const codigoSGS = this.getCodigoSGS(this.moedaDestino);

    this.servicoDeConversaoDeMoeda.obterCotacaoSGS(codigoSGS).subscribe(cotacao => {
      debugger;
      this.resultado = this.valor / cotacao;
    });
  }

  getCodigoSGS(moeda: string): number {
    switch (moeda) {
      case 'USD': return 1;
      case 'EUR': return 21619;
      case 'ARS': return 4;
      default: return 1;
    }
  }
}
