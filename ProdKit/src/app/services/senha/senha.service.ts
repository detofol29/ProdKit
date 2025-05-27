import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface GerarSenhaRequest {
  Tamanho: number;
  IncluirCaracteresEspeciais: boolean;
  IncluirNumeros: boolean;
  IncluirLetrasMaiusculas: boolean;
  IncluirLetrasMinusculas: boolean;
}

export interface Resposta {
  senha?: string;
  erro?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SenhaService {

  private caminhoGerarSenha = '/senha/gerar';
  private apiUrl = environment.apiUrl + this.caminhoGerarSenha;

  constructor(private http: HttpClient) {}

  gerarSenha(request: GerarSenhaRequest) {
    return this.http.post<Resposta>(this.apiUrl, request);
  }
}
