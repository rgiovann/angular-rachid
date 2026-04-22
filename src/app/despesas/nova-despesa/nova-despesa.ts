import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nova-despesa',
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './nova-despesa.html',
  styleUrl: './nova-despesa.css',
})
export class NovaDespesa {
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

  pessoa = this.pessoas[0];
  descricao = '';
  data: Date | null = new Date();
  valor = 0;

  constructor(private readonly dialogRef: MatDialogRef<NovaDespesa>) {}

  fechar(): void {
    this.dialogRef.close();
  }
}
