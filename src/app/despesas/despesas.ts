import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { Despesa } from './despesa/despesa';
import { NovaDespesa } from './nova-despesa/nova-despesa';

import { DespesasService } from './despesas.service';
import { PessoasService } from '../pessoas/pessoas.service';

import { AsyncPipe } from '@angular/common';
import { combineLatest, map, Observable } from 'rxjs';
import { DialogConfirmacao } from '../shared/dialog-confirmacao/dialog.confirmacao';
import { DialogAviso } from '../shared/dialog-aviso/dialog-aviso';

type DespesaView = {
  id: string;
  pessoaNome: string;
  descricao: string;
  valor: number;
  data: string;
};

@Component({
  selector: 'app-despesas',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, Despesa, AsyncPipe],
  templateUrl: './despesas.html',
  styleUrl: './despesas.css',
})
export class Despesas {
  despesas$: Observable<DespesaView[]>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly despesasService: DespesasService,
    private readonly pessoasService: PessoasService,
  ) {
    this.despesas$ = combineLatest([
      this.despesasService.despesas$,
      this.pessoasService.pessoas$,
    ]).pipe(
      map(([despesas, pessoas]) => {
        return despesas.map((d) => {
          const pessoa = pessoas.find((p) => p.id === d.pessoaId);

          return {
            id: d.id,
            pessoaNome: pessoa?.nome ?? 'Desconhecido',
            descricao: d.descricao,
            valor: d.valor,
            data: d.data,
          };
        });
      }),
    );
  }
  /*
  abrirDialogNovaDespesa(): void {
    this.dialog.open(NovaDespesa, {
      width: '620px',
    });
  }
*/

  abrirDialogNovaDespesa(): void {
    const pessoas = this.pessoasService.snapshot;

    if (!pessoas || pessoas.length === 0) {
      this.dialog.open(DialogAviso, {
        data: 'Não é possível criar uma despesa pois não existem pessoas cadastradas para vinculação.',
        width: '420px',
      });

      return;
    }
    this.dialog.open(NovaDespesa, {
      width: '620px',
    });
  }

  removerDespesa(event: { id: string; pessoa: string; descricao: string; valor: number }): void {
    const mensagem = `Deseja remover a despesa "${event.descricao}" de ${event.pessoa} no valor de ${event.valor.toLocaleString(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL',
      },
    )}?`;

    const dialogRef = this.dialog.open(DialogConfirmacao, {
      data: mensagem,
    });

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (!confirmado) return;

      this.despesasService.remove(event.id);
    });
  }
}
