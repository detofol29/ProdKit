import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertaComponent } from '../../componentes/dialog-alerta/dialog-alerta.component';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(private dialog: MatDialog) { }

  ExibirMensagem(mensagem: string): void {
    this.dialog.open(DialogAlertaComponent, {
      data: { mensagem }
    });
  }
}
