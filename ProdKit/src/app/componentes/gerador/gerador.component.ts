import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SenhaService, GerarSenhaRequest, Resposta } from '../../services/senha.service';

@Component({
  selector: 'app-gerador',
  imports: [FormsModule, CommonModule],
  templateUrl: './gerador.component.html',
  styleUrl: './gerador.component.css'
})
export class GeradorComponent {
  value: number = 10;
  senhaGerada: string = '';
  letrasMaiusculas = false;
  letrasMinusculas = false;
  numeros = false;
  caracteresEspeciais = false;

  constructor(private senhaService: SenhaService) {}

  copiarSenha() {
    navigator.clipboard
      .writeText(this.senhaGerada)
      .then(() => {
        alert('Texto copiado para a área de transferência!');
      })
      .catch(err => {
        alert('Falha ao copiar o texto.');
        console.error(err);
      });
  }

  aoClicarEmGerar(){

    const request: GerarSenhaRequest = {
      Tamanho: this.value,
      IncluirCaracteresEspeciais: this.caracteresEspeciais,
      IncluirNumeros: this.numeros,
      IncluirLetrasMaiusculas: this.letrasMaiusculas,
      IncluirLetrasMinusculas: this.letrasMinusculas
    };

    this.senhaService.gerarSenha(request).subscribe({

      next: (res: Resposta) => {
        this.senhaGerada = res.senha ?? "";
      },

      error: (err) => {
        console.error('Erro ao gerar senha', err);
        alert(err.error.erro);
      }

    });

  }
}