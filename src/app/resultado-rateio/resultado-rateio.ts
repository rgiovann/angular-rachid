import { CurrencyPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { RateioResultado } from '../rateio/rateio.model';

type TipoMovimentoRateio = 'deve' | 'recebe';

interface ResumoRateioViewModel {
  totalGasto: number;
  valorPorPessoa: number;
}

interface MovimentoRateioViewModel {
  tipo: TipoMovimentoRateio;
  valor: number;
  contraparteNome: string;
}

interface PessoaRateioViewModel {
  pessoaId: string;
  pessoaNome: string;
  saldo: number;
  movimentos: MovimentoRateioViewModel[];
  estaQuite: boolean;
}

interface ResultadoRateioViewModel {
  resumo: ResumoRateioViewModel;
  pessoas: PessoaRateioViewModel[];
}

@Component({
  selector: 'app-resultado-rateio',
  imports: [MatDialogModule, MatButtonModule, CurrencyPipe],
  templateUrl: './resultado-rateio.html',
  styleUrl: './resultado-rateio.css',
  standalone: true,
})
export class ResultadoRateio {
  readonly viewModel: ResultadoRateioViewModel;

  constructor(@Inject(MAT_DIALOG_DATA) public readonly resultado: RateioResultado) {
    this.viewModel = this.criarViewModel(resultado);
  }

  private criarViewModel(resultado: RateioResultado): ResultadoRateioViewModel {
    const pessoas = resultado.saldos.map((saldoPessoa) => {
      const movimentos: MovimentoRateioViewModel[] = [];

      for (const transferencia of resultado.transferencias) {
        if (transferencia.devedorId === saldoPessoa.pessoaId) {
          movimentos.push({
            tipo: 'deve',
            valor: transferencia.valor,
            contraparteNome: transferencia.credorNome,
          });
        }

        if (transferencia.credorId === saldoPessoa.pessoaId) {
          movimentos.push({
            tipo: 'recebe',
            valor: transferencia.valor,
            contraparteNome: transferencia.devedorNome,
          });
        }
      }

      return {
        pessoaId: saldoPessoa.pessoaId,
        pessoaNome: saldoPessoa.pessoaNome,
        saldo: saldoPessoa.saldo,
        movimentos,
        estaQuite: movimentos.length === 0,
      };
    });

    pessoas.sort((a, b) => a.pessoaNome.localeCompare(b.pessoaNome, 'pt-BR'));

    return {
      resumo: {
        totalGasto: resultado.totalGasto,
        valorPorPessoa: resultado.valorPorPessoa,
      },
      pessoas,
    };
  }
}
