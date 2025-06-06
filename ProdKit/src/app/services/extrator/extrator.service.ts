import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface ExtratorRequest {
  video: File;
}

export interface Resposta {
  audio?: File;
  erro?: string;
}

@Injectable({
  providedIn: 'root'
})

export class ExtratorService {

  private caminhoExtrairAudio = '/extrator/extrair';
  private apiUrl = environment.apiUrl + this.caminhoExtrairAudio;

  constructor(private http: HttpClient) {}

  extrairAudio(request: ExtratorRequest) {
    debugger;
    const formData = new FormData();
    formData.append('file', request.video); // O nome "file" deve bater com o nome no Controller

    return this.http.post(this.apiUrl, formData, {
      responseType: 'blob' // Para receber o arquivo mp3
    });
  }
}
