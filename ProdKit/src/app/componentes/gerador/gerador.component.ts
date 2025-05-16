import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gerador',
  imports: [FormsModule, CommonModule],
  templateUrl: './gerador.component.html',
  styleUrl: './gerador.component.css'
})
export class GeradorComponent {
  value: number = 10;
  senhaGerada: string = '';

  copiarSenha() {
    navigator.clipboard.writeText(this.senhaGerada).then(() => {
      alert('Texto copiado para a área de transferência!');
    }).catch(err => {
      alert('Falha ao copiar o texto.');
      console.error(err);
    });
  }
}
