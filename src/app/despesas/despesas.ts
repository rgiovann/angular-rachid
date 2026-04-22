import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Despesa } from './despesa/despesa';
import { NovaDespesa } from './nova-despesa/nova-despesa';

@Component({
  selector: 'app-despesas',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, Despesa],
  templateUrl: './despesas.html',
  styleUrl: './despesas.css',
  standalone: true,
})
export class Despesas {
  readonly despesas = [
    { pessoa: 'Antonio de Souza', descricao: 'Pizza', valor: 90, data: '2026-04-10' },
    {
      pessoa: 'Shara Raquel Matias Freitas',
      descricao: 'Supermercado',
      valor: 155.5,
      data: '2026-04-12',
    },
    { pessoa: 'Carlos Eduardo Almeida', descricao: 'Gasolina', valor: 80, data: '2026-04-14' },
  ];

  constructor(private readonly dialog: MatDialog) {}

  abrirDialogNovaDespesa(): void {
    this.dialog.open(NovaDespesa, {
      width: '620px',
    });
  }
}
