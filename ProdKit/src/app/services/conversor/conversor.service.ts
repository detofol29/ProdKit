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
    const formData = new FormData();
    formData.append('file', request.arquivo); // <-- nome esperado no backend
    formData.append('tipoDeConversao', request.tipoConversao);

    return this.http.post(this.apiUrl, formData, {
      responseType: 'blob'
    });
  }
}
