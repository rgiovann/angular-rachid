import { Injectable } from '@angular/core';
import { Despesa } from '../despesas/despesa.model';
import { Pessoa } from '../pessoas/pessoa.model';
import { RateioResultado, RateioSaldoPessoa, RateioTransferencia } from './rateio.model';

type ValoresPorPessoa = Map<string, number>;

@Injectable({
  providedIn: 'root',
})
export class RateioService {
  private readonly epsilon = 0.000001;

  calcular(pessoas: Pessoa[], despesas: Despesa[]): RateioResultado {
    if (pessoas.length === 0) {
      return {
        totalGasto: 0,
        valorPorPessoa: 0,
        transferencias: [],
        saldos: [],
      };
    }

    const pessoasPorId = new Map(pessoas.map((pessoa) => [pessoa.id, pessoa]));
    const totalPessoas = pessoas.length;

    const aPagarPorPessoa = new Map<string, ValoresPorPessoa>();
    const totalPagoPorPessoa = new Map<string, number>();

    for (const pessoa of pessoas) {
      const aPagar = new Map<string, number>();

      for (const outraPessoa of pessoas) {
        if (outraPessoa.id !== pessoa.id) {
          aPagar.set(outraPessoa.id, 0);
        }
      }

      aPagarPorPessoa.set(pessoa.id, aPagar);
      totalPagoPorPessoa.set(pessoa.id, 0);
    }

    let totalGasto = 0;

    for (const despesa of despesas) {
      const pagador = pessoasPorId.get(despesa.pessoaId);

      if (!pagador) {
        continue;
      }

      totalGasto += despesa.valor;
      totalPagoPorPessoa.set(pagador.id, (totalPagoPorPessoa.get(pagador.id) ?? 0) + despesa.valor);

      const quotaIndividual = despesa.valor / totalPessoas;

      for (const pessoa of pessoas) {
        if (pessoa.id === pagador.id) {
          continue;
        }

        const aPagar = aPagarPorPessoa.get(pessoa.id);
        const valorAtual = aPagar?.get(pagador.id) ?? 0;
        aPagar?.set(pagador.id, valorAtual + quotaIndividual);
      }
    }

    const transferencias: RateioTransferencia[] = [];

    for (let i = 0; i < pessoas.length; i++) {
      const pessoaAtual = pessoas[i];

      for (let j = i + 1; j < pessoas.length; j++) {
        const outraPessoa = pessoas[j];
        const atualPagaParaOutra = aPagarPorPessoa.get(pessoaAtual.id)?.get(outraPessoa.id) ?? 0;
        const outraPagaParaAtual = aPagarPorPessoa.get(outraPessoa.id)?.get(pessoaAtual.id) ?? 0;
        const valorConsolidado = atualPagaParaOutra - outraPagaParaAtual;

        if (valorConsolidado > this.epsilon) {
          transferencias.push({
            devedorId: pessoaAtual.id,
            devedorNome: pessoaAtual.nome,
            credorId: outraPessoa.id,
            credorNome: outraPessoa.nome,
            valor: this.arredondarMoeda(valorConsolidado),
          });
        } else if (valorConsolidado < -this.epsilon) {
          transferencias.push({
            devedorId: outraPessoa.id,
            devedorNome: outraPessoa.nome,
            credorId: pessoaAtual.id,
            credorNome: pessoaAtual.nome,
            valor: this.arredondarMoeda(-valorConsolidado),
          });
        }
      }
    }

    const valorPorPessoa = totalGasto / totalPessoas;

    const saldos: RateioSaldoPessoa[] = pessoas.map((pessoa) => {
      const totalPago = totalPagoPorPessoa.get(pessoa.id) ?? 0;

      return {
        pessoaId: pessoa.id,
        pessoaNome: pessoa.nome,
        totalPago: this.arredondarMoeda(totalPago),
        saldo: this.arredondarMoeda(totalPago - valorPorPessoa),
      };
    });

    return {
      totalGasto: this.arredondarMoeda(totalGasto),
      valorPorPessoa: this.arredondarMoeda(valorPorPessoa),
      transferencias,
      saldos,
    };
  }

  private arredondarMoeda(valor: number): number {
    return Math.round((valor + Number.EPSILON) * 100) / 100;
  }
}
