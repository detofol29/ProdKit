import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-alerta',
  templateUrl: './dialog-alerta.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule]
})
export class DialogAlertaComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { mensagem: string }) {}
}
