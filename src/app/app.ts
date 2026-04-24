import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { Pessoas } from './pessoas/pessoas';
import { Despesas } from './despesas/despesas';
import { Rateio } from './rateio/rateio';
import { MatDialog } from '@angular/material/dialog';
import { PessoasService } from './pessoas/pessoas.service';
import { DespesasService } from './despesas/despesas.service';
import { DialogConfirmacao } from './shared/dialog-confirmacao/dialog.confirmacao';
import { MatIcon } from '@angular/material/icon';

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
  ) {}

  // 🔷 controle de estado mínimo para UX
  get podeCalcular(): boolean {
    return this.pessoasService.temPessoas() && this.despesasService.temDespesas();
  }

  // 🔷 abre dialog de resultado
  abrirRateio(): void {
    this.dialog.open(Rateio, {
      width: '600px',
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
