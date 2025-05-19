import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface GerarSenhaRequest {
  Tamanho: number;
  IncluirCaracteresEspeciais: boolean;
  IncluirNumeros: boolean;
  IncluirLetrasMaiusculas: boolean;
  IncluirLetrasMinusculas: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SenhaService {
  private apiUrl = `${environment.apiUrl}/senha`;

  constructor(private http: HttpClient) {}

  gerarSenha(request: GerarSenhaRequest) {
    return this.http.post<string>(`${this.apiUrl}/gerar`, request);
  }
}
