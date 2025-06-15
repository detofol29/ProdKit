import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { ExtratorService } from '../../services/extrator/extrator.service';

@Component({
  selector: 'app-conversor',
  imports: [CommonModule,
    RouterModule,
    FormsModule,],
  templateUrl: './conversor.component.html',
  styleUrl: './conversor.component.css'
})
export class ConversorComponent {
  constructor(private extratorService: ExtratorService) {}

  arquivoCarregado: File | null = null;
  videoUrl: string | null = null;
  arquivoConvertido: File | null = null;
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

    if (file.type !== formatoMp4) {
      alert(mensagemFormatoInvalido);
      return;
    }

    alert(mensagemArquivoSelecionado + file.name);

    this.arquivoCarregado = file;
    this.videoUrl = URL.createObjectURL(file);
  }

  ConverterArquivo(): void {
    const formatoMp3 = 'audio.mp3';
    this.iniciarCarregamento();
    this.extratorService.extrairAudio({ video: this.arquivoCarregado as File })
    .subscribe(blob => {
      debugger;
      const mp3File = new File([blob], formatoMp3, { type: 'audio/mpeg' });
      this.audioUrl = URL.createObjectURL(mp3File);
      this.arquivoConvertido = mp3File;
    });
  }

  removerVideo(event: Event): void {
    event.stopPropagation(); // Evita abrir o seletor de arquivos ao clicar no "X", nn funcionando
    this.arquivoCarregado = null;
    this.videoUrl = null;
    this.arquivoConvertido = null;
    this.audioUrl = null;
  }

  baixarArquivo(): void {
    if (!this.arquivoConvertido) return;

    const a = document.createElement('a');
    a.href = this.audioUrl as string;
    a.download = this.arquivoConvertido.name || 'audioExtraido.mp3';
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
