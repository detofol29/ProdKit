import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversorMoedaService {

  constructor(private http: HttpClient) {}

  obterCotacaoSGS(codigoSGS: number): Observable<number> {
    const url = this._obterUrl(codigoSGS);
    
    return this.http.get<any[]>(url).pipe(map(res => res[0].valor));
  }

  _obterUrl(codigoSGS: number): string {
    const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${codigoSGS}/dados/ultimos/1?formato=json`;

    return url;
  }
}
