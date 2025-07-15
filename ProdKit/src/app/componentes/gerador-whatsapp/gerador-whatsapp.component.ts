import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MensagemService } from '../../services/mensagem/mensagem.service';

@Component({
  selector: 'app-gerador-whatsapp',
  imports: [CommonModule, FormsModule],
  templateUrl: './gerador-whatsapp.component.html',
  styleUrl: './gerador-whatsapp.component.css'
})
export class GeradorWhatsappComponent {
  numero: string = '';
  mensagem: string = '';
  linkGerado: string = '';

  constructor(private mensagemService: MensagemService) {}

  gerarLink() {
    if (!this.numero) {
      this.mensagemService.ExibirMensagem('Por favor, insira um número de telefone válido.');
      return;
    }
    const numeroLimpo = this.numero.replace(/\D/g, '');
    const mensagemCodificada = encodeURIComponent(this.mensagem || '');
    this.linkGerado = `https://wa.me/${numeroLimpo}?text=${mensagemCodificada}`;
  }

  copiarLink() {
    navigator.clipboard.writeText(this.linkGerado).then(() => {
      this.mensagemService.ExibirMensagem('Link copiado para a área de transferência!');
    });
  }
}
