import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-tradutor',
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  standalone: true,
  templateUrl: './tradutor.component.html',
  styleUrl: './tradutor.component.css'
})
export class TradutorComponent {
  idiomaOrigem: string = 'pt';
  idiomaDestino: string = 'en';
  textoOriginal: string = '';
  textoTraduzido: string = '';

  constructor(private http: HttpClient) {}

  traduzir() {
  const body = {
    text: [this.textoOriginal],
    target_lang: this.idiomaDestino.toUpperCase()
  };

  this.http.post('https://api-free.deepl.com/v2/translate', body, {
    headers: {
      'Authorization': 'DeepL-Auth-Key c5156fd8-ad22-425a-8718-dcae7b7a519b:fx',
      'Content-Type': 'application/json'
    }
  }).subscribe({
    next: (res: any) => {
      this.textoTraduzido = res.translations[0].text;
    },
    error: (err) => {
      console.error(err);
      alert('Erro ao traduzir com DeepL.');
    }
  });
}



  copiarTexto() {
    navigator.clipboard.writeText(this.textoTraduzido).then(() => {
      alert('Texto copiado para a área de transferência!');
    }).catch(err => {
      alert('Falha ao copiar o texto.');
      console.error(err);
    });
  }
}
