import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-nova-pessoa',
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './nova-pessoa.html',
  styleUrl: './nova-pessoa.css',
  standalone: true,
})
export class NovaPessoa {
  nome = '';

  private readonly STORAGE_KEY = 'pessoas';

  constructor(
    private readonly dialogRef: MatDialogRef<NovaPessoa>,
    private readonly dialog: MatDialog,
  ) {}

  fechar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    const nome = this.nome.trim();
    if (!nome) return;

    // 👇 só retorna dado
    this.dialogRef.close(nome);
  }
}
