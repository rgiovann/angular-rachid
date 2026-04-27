import { Component, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Despesas } from './despesas/despesas';
import { DespesasService } from './despesas/despesas.service';
import { Header } from './header/header';
import { Pessoas } from './pessoas/pessoas';
import { PessoasService } from './pessoas/pessoas.service';
import { RateioService } from './rateio/rateio.service';
import { ResultadoRateio } from './resultado-rateio/resultado-rateio';
import { DialogConfirmacao } from './shared/dialog-confirmacao/dialog.confirmacao';

@Component({
  selector: 'app-root',
  imports: [Header, Pessoas, Despesas, MatIcon],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('rachid');

  constructor(
    private readonly dialog: MatDialog,
    private readonly pessoasService: PessoasService,
    private readonly despesasService: DespesasService,
    private readonly rateioService: RateioService,
  ) {}

  get podeCalcular(): boolean {
    return this.pessoasService.temPessoas() && this.despesasService.temDespesas();
  }

  abrirRateio(): void {
    const resultado = this.rateioService.calcular(
      this.pessoasService.snapshot,
      this.despesasService.snapshot,
    );

    this.dialog.open(ResultadoRateio, {
      width: 'min(600px, calc(100vw - 1rem))',
      maxWidth: 'calc(100vw - 1rem)',
      data: resultado,
    });
  }

  limparTudo(): void {
    const semPessoas = this.pessoasService.snapshot.length === 0;
    const semDespesas = this.despesasService.snapshot.length === 0;

    if (semPessoas && semDespesas) {
      return;
    }

    const dialogRef = this.dialog.open(DialogConfirmacao, {
      data: 'Deseja realmente limpar todos os dados? Esta ação não pode ser desfeita.',
    });

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (!confirmado) return;

      this.pessoasService.clear();
      this.despesasService.clear();
    });
  }
}
