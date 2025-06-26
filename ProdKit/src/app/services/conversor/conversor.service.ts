import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


export interface ConversorRequest {
  arquivo: File;
  tipoConversao: string;
}

@Injectable({
  providedIn: 'root'
})

export class ConversorService {

  private caminhoExtrairAudio = '/conversor/converterArquivo';
  private apiUrl = environment.apiUrl + this.caminhoExtrairAudio;

  constructor(private http: HttpClient) {}

  converterArquivo(request: ConversorRequest) {
    debugger;
    const formData = new FormData();
    formData.append('arquivo', request.arquivo);
    formData.append('tipoConversao', request.tipoConversao);

    return this.http.post(this.apiUrl, formData, {
      responseType: 'blob'
    });
  }
}
