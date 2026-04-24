import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-despesa',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CurrencyPipe, DatePipe],
  templateUrl: './despesa.html',
  styleUrl: './despesa.css',
})
export class Despesa {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) pessoa!: string;
  @Input({ required: true }) descricao!: string;
  @Input({ required: true }) valor!: number;
  @Input({ required: true }) data!: string;

  @Output() remover = new EventEmitter<{
    id: string;
    pessoa: string;
    descricao: string;
    valor: number;
  }>();

  removerDespesa(): void {
    this.remover.emit({
      id: this.id,
      pessoa: this.pessoa,
      descricao: this.descricao,
      valor: this.valor,
    });
  }
}
