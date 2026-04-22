import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Pessoa } from './pessoa/pessoa';
import { NovaPessoa } from './nova-pessoa/nova-pessoa';

@Component({
  selector: 'app-pessoas',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, Pessoa],
  templateUrl: './pessoas.html',
  styleUrl: './pessoas.css',
  standalone: true,
})
export class Pessoas {
  readonly pessoas = [
    'Antonio de Souza',
    'José Marcos de Freitas',
    'Shara Raquel Matias Freitas',
    'Carlos Eduardo Almeida',
    'Fernanda Cristina Lopes',
    'Ricardo Henrique Batista',
    'Juliana Pereira Santos',
    'Marcos Vinícius Ribeiro',
  ];
  constructor(private readonly dialog: MatDialog) {}

  abrirDialogNovaPessoa(): void {
    this.dialog.open(NovaPessoa, {
      width: '420px',
    });
  }
}
