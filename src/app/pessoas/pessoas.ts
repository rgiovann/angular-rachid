import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Pessoa } from './pessoa/pessoa';
import { NovaPessoa } from './nova-pessoa/nova-pessoa';
import { PessoasService } from './pessoas.service';
import { Observable } from 'rxjs';
import { type Pessoa as PessoaModel } from './pessoa.model';
import { AsyncPipe } from '@angular/common';
import { DialogConfirmacao } from '../shared/dialog-confirmacao/dialog.confirmacao';

@Component({
  selector: 'app-pessoas',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, Pessoa, AsyncPipe],
  templateUrl: './pessoas.html',
  styleUrl: './pessoas.css',
  standalone: true,
})
export class Pessoas {
  // agora é stream, não array
  pessoas$: Observable<PessoaModel[]>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly pessoasService: PessoasService,
  ) {
    this.pessoas$ = this.pessoasService.pessoas$;
  }

  abrirDialogNovaPessoa(): void {
    const dialogRef = this.dialog.open(NovaPessoa, {
      width: '420px',
    });
  }

  removerPessoa(pessoa: PessoaModel): void {
    const dialogRef = this.dialog.open(DialogConfirmacao, {
      data: `Deseja remover "${pessoa.nome}"? Todas as despesas associadas também serão excluídas.`,
    });

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (!confirmado) return;

      this.pessoasService.remove(pessoa.id);
    });
  }
}
