import { Component, Input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-despesa',
  imports: [MatButtonModule, MatIconModule, CurrencyPipe, DatePipe],
  templateUrl: './despesa.html',
  styleUrl: './despesa.css',
  standalone: true,
})
export class Despesa {
  removerDespesa() {
    throw new Error('Method not implemented.');
  }
  @Input() pessoa = '';
  @Input() descricao = '';
  @Input() valor = 0;
  @Input() data = '';
}
