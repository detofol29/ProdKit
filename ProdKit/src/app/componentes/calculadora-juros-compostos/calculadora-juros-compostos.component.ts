import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculadora-juros-compostos',
  imports: [CommonModule, FormsModule],
  templateUrl: './calculadora-juros-compostos.component.html',
  styleUrl: './calculadora-juros-compostos.component.css'
})
export class CalculadoraJurosCompostosComponent {
  valorInicial: number = 0;
  taxa: number = 0; // taxa anual
  periodo: number = 0; // em anos
  aporte: number = 0;

  montante: number | null = null;
  valorInvestido: number | null = null;
  totalJuros: number | null = null;

  calcularJuros() {
    const P = this.valorInicial;
    const A = this.aporte;
    const taxaAnual = this.taxa / 100;
    const i = Math.pow(1 + taxaAnual, 1 / 12) - 1;
    const n = this.periodo * 12;

    if (P >= 0 && A >= 0 && taxaAnual > 0 && n > 0) {
      const montanteInicial = P * Math.pow(1 + i, n);
      const montanteAportes = A * ((Math.pow(1 + i, n) - 1) / i);
      this.montante = montanteInicial + montanteAportes;

      this.valorInvestido = P + (A * n);
      this.totalJuros = this.montante - this.valorInvestido;
    } else {
      this.montante = null;
      this.valorInvestido = null;
      this.totalJuros = null;
    }
  }
}
