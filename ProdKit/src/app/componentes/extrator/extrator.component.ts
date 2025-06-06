import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { ValidadorService } from '../../services/validador/validador.service';
import { ExtratorService, ExtratorRequest, Resposta } from '../../services/extrator/extrator.service';


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

  constructor(private extratorService: ExtratorService) {}

  videoCarregado: File | null = null;
  videoUrl: string | null = null;
  audioExtraido: File | null = null;
  aoSelecionarArquivo(event: Event): void {
    const input = event.target as HTMLInputElement;
    debugger;
    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];

    if (file.type !== 'video/mp4') {
      alert('Tipo de arquivo inválido. Apenas MP4 é permitido.');
      return;
    }

    alert('Arquivo selecionado: ' + file.name);

    this.videoCarregado = file;
    this.videoUrl = URL.createObjectURL(file);
  }

  ExtrairAudio(): void {
    this.extratorService.extrairAudio({ video: this.videoCarregado as File })
    .subscribe(blob => {
      debugger;
      const mp3File = new File([blob], 'audio.mp3', { type: 'audio/mpeg' });
      this.audioExtraido = mp3File;
    });
  }

  removerVideo(event: Event): void {
    event.stopPropagation(); // Evita abrir o seletor de arquivos ao clicar no "X"
    this.videoCarregado = null;
    this.videoUrl = null;
  }
}
