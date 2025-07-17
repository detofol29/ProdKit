import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cotacao {
  moedaOrigem?: string;
  moedaDestino?: string;
  valor?: number;
}
export interface Resposta {
  cotacao?: number;
  erro?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConversorMoedaService {

  constructor(private http: HttpClient) {}

  private readonly caminhoGerarSenha = '/cotacao/obter';
  private readonly apiUrl = environment.apiUrl + this.caminhoGerarSenha;

  obterCotacao(cotacao: Cotacao): Observable<Resposta> {
    return this.http.post<Resposta>(this.apiUrl, cotacao);
  }
}
