import { Component } from '@angular/core';

@Component({
  selector: 'app-formatador',
  imports: [],
  templateUrl: './formatador.component.html',
  styleUrl: './formatador.component.css'
})
export class FormatadorComponent {

  formatJson(content: string): string {
    try {
      const obj = JSON.parse(content);
      return JSON.stringify(obj, null, 2); // 2 espaços de indentação
    } catch (e) {
      return 'JSON inválido';
    }
  }

}
