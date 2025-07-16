import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conversor-de-unidades',
  imports: [FormsModule, CommonModule],
  templateUrl: './conversor-de-unidades.component.html',
  styleUrl: './conversor-de-unidades.component.css'
})
export class ConversorDeUnidadesComponent {
  valor: number = 0;
  categoriaSelecionada: string = 'Comprimento';
  unidadeOrigem: string = '';
  unidadeDestino: string = '';
  resultado: number | null = null;

  categorias: string[] = ['Comprimento', 'Peso', 'Tempo'];
  unidades: string[] = [];

  fatoresConversao: { [categoria: string]: { [unidade: string]: number } } = {
    Comprimento: {
      M: 1,
      KM: 1000,
      CM: 0.01,
      MI: 1609.34
    },
    Peso: {
      KG: 1,
      G: 0.001,
      LB: 0.453592,
      OZ: 0.0283495
    },
    Tempo: {
      SEGUNDO: 1,
      MINUTO: 60,
      HORA: 3600,
      DIA: 86400
    }
  };

  ngOnInit() {
    this.atualizarUnidades();
  }

  atualizarUnidades() {
    const unidadesCategoria = Object.keys(this.fatoresConversao[this.categoriaSelecionada]);
    this.unidades = unidadesCategoria;
    this.unidadeOrigem = unidadesCategoria[0];
    this.unidadeDestino = unidadesCategoria[1] || unidadesCategoria[0];
  }

  converterUnidade() {
    const fatorOrigem = this.fatoresConversao[this.categoriaSelecionada][this.unidadeOrigem];
    const fatorDestino = this.fatoresConversao[this.categoriaSelecionada][this.unidadeDestino];

    if (this.unidadeOrigem === this.unidadeDestino) {
      this.resultado = this.valor;
    } else {
      const valorBase = this.valor * fatorOrigem;
      this.resultado = valorBase / fatorDestino;
    }
  }
}
