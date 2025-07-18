import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { ExtratorService } from '../../services/extrator/extrator.service';
import { MensagemService } from '../../services/mensagem/mensagem.service';


@Component({
  selector: 'app-extrator',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './extrator.component.html',
  styleUrl: './extrator.component.css'
})

export class ExtratorComponent {

  constructor(private extratorService: ExtratorService, private mensagemService: MensagemService) {}

  videoCarregado: File | null = null;
  videoUrl: string | null = null;
  audioExtraido: File | null = null;
  audioUrl: string | null = null;
  carregamentoPorcentagem: string | null = null;
  private intervalo: any;

  aoSelecionarArquivo(event: Event): void {
    const formatoMp4 = 'video/mp4';
    const mensagemFormatoInvalido = 'Tipo de arquivo inválido. Apenas MP4 é permitido.';
    const mensagemArquivoSelecionado = 'Arquivo selecionado: ';
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];

    if(file.size > 100 * 1024 * 1024) { // Limite de 100MB
      this.mensagemService.ExibirMensagem('O arquivo é muito grande. O tamanho máximo permitido é 100MB.');
      return;
    }

    if (file.type !== formatoMp4) {
      this.mensagemService.ExibirMensagem(mensagemFormatoInvalido);
      return;
    }

    this.mensagemService.ExibirMensagem(mensagemArquivoSelecionado + file.name);

    this.videoCarregado = file;
    this.videoUrl = URL.createObjectURL(file);
  }

  ExtrairAudio(): void {
    const formatoMp3 = 'audio.mp3';

    if (!this.videoCarregado) {
      this.mensagemService.ExibirMensagem('Nenhum vídeo selecionado.');
      return;
    }

    this.iniciarCarregamento();
    this.extratorService.extrairAudio({ video: this.videoCarregado as File })
    .subscribe(blob => {
      const mp3File = new File([blob], formatoMp3, { type: 'audio/mpeg' });
      this.audioUrl = URL.createObjectURL(mp3File);
      this.audioExtraido = mp3File;
    });
  }

  removerVideo(event: Event): void {
    event.stopPropagation(); // Evita abrir o seletor de arquivos ao clicar no "X", nn funcionando
    this.videoCarregado = null;
    this.videoUrl = null;
    this.audioExtraido = null;
    this.audioUrl = null;
  }

  baixarAudio(): void {
    if (!this.audioExtraido) return;

    const a = document.createElement('a');
    a.href = this.audioUrl as string;
    a.download = this.audioExtraido.name || 'audioExtraido.mp3';
    a.click();
    URL.revokeObjectURL(this.audioUrl as string); // libera a memória usada pela URL
  }

  iniciarCarregamento() {
    let progresso = 0;
    this.carregamentoPorcentagem = '0%';

    // Limpa qualquer intervalo anterior
    clearInterval(this.intervalo);

    this.intervalo = setInterval(() => {
      if (progresso >= 100) {
        clearInterval(this.intervalo);
      } else {
        progresso++;
        this.carregamentoPorcentagem = `${progresso}%`;
      }
    }, 50); // 100% / 50ms = 5s
  }
}
