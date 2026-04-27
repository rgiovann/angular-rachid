import { Despesa } from '../despesas/despesa.model';
import { Pessoa } from '../pessoas/pessoa.model';
import { RateioService } from './rateio.service';

describe('RateioService', () => {
  let service: RateioService;

  beforeEach(() => {
    service = new RateioService();
  });

  it('should calculate the expected transfers for the validated Java example', () => {
    const pessoas: Pessoa[] = [
      { id: 'anto', nome: 'ANTO' },
      { id: 'jose', nome: 'JOSE' },
      { id: 'mario', nome: 'MARIO' },
    ];

    const despesas: Despesa[] = [
      {
        id: '1',
        pessoaId: 'anto',
        descricao: 'PGTO 1',
        valor: 170,
        data: '2026-04-27T00:00:00.000Z',
      },
      {
        id: '2',
        pessoaId: 'jose',
        descricao: 'PGTO 2',
        valor: 75,
        data: '2026-04-27T00:00:00.000Z',
      },
      {
        id: '3',
        pessoaId: 'jose',
        descricao: 'PGTO 3',
        valor: 25,
        data: '2026-04-27T00:00:00.000Z',
      },
    ];

    const resultado = service.calcular(pessoas, despesas);

    expect(resultado.totalGasto).toBe(270);
    expect(resultado.valorPorPessoa).toBe(90);
    expect(resultado.transferencias).toEqual([
      {
        devedorId: 'jose',
        devedorNome: 'JOSE',
        credorId: 'anto',
        credorNome: 'ANTO',
        valor: 23.33,
      },
      {
        devedorId: 'mario',
        devedorNome: 'MARIO',
        credorId: 'anto',
        credorNome: 'ANTO',
        valor: 56.67,
      },
      {
        devedorId: 'mario',
        devedorNome: 'MARIO',
        credorId: 'jose',
        credorNome: 'JOSE',
        valor: 33.33,
      },
    ]);
    expect(resultado.saldos).toEqual([
      { pessoaId: 'anto', pessoaNome: 'ANTO', totalPago: 170, saldo: 80 },
      { pessoaId: 'jose', pessoaNome: 'JOSE', totalPago: 100, saldo: 10 },
      { pessoaId: 'mario', pessoaNome: 'MARIO', totalPago: 0, saldo: -90 },
    ]);
  });

  it('should calculate the expected transfers for the second validated Java scenario', () => {
    const pessoas: Pessoa[] = [
      { id: 'anto', nome: 'ANTO' },
      { id: 'jose', nome: 'JOSE' },
      { id: 'mario', nome: 'MARIO' },
    ];

    const despesas: Despesa[] = [
      {
        id: '1',
        pessoaId: 'anto',
        descricao: 'PGTO 1',
        valor: 456.34,
        data: '2026-04-27T00:00:00.000Z',
      },
      {
        id: '2',
        pessoaId: 'anto',
        descricao: 'PGTO 2',
        valor: 340.32,
        data: '2026-04-27T00:00:00.000Z',
      },
      {
        id: '3',
        pessoaId: 'jose',
        descricao: 'PGTO 3',
        valor: 234.78,
        data: '2026-04-27T00:00:00.000Z',
      },
      {
        id: '4',
        pessoaId: 'mario',
        descricao: 'PGTO 4',
        valor: 156.76,
        data: '2026-04-27T00:00:00.000Z',
      },
      {
        id: '5',
        pessoaId: 'mario',
        descricao: 'PGTO 5',
        valor: 287.0,
        data: '2026-04-27T00:00:00.000Z',
      },
    ];

    const resultado = service.calcular(pessoas, despesas);

    expect(resultado.totalGasto).toBe(1475.2);
    expect(resultado.valorPorPessoa).toBe(491.73);
    expect(resultado.transferencias).toEqual([
      {
        devedorId: 'jose',
        devedorNome: 'JOSE',
        credorId: 'anto',
        credorNome: 'ANTO',
        valor: 187.29,
      },
      {
        devedorId: 'mario',
        devedorNome: 'MARIO',
        credorId: 'anto',
        credorNome: 'ANTO',
        valor: 117.63,
      },
      {
        devedorId: 'jose',
        devedorNome: 'JOSE',
        credorId: 'mario',
        credorNome: 'MARIO',
        valor: 69.66,
      },
    ]);
    expect(resultado.saldos).toEqual([
      { pessoaId: 'anto', pessoaNome: 'ANTO', totalPago: 796.66, saldo: 304.93 },
      { pessoaId: 'jose', pessoaNome: 'JOSE', totalPago: 234.78, saldo: -256.95 },
      { pessoaId: 'mario', pessoaNome: 'MARIO', totalPago: 443.76, saldo: -47.97 },
    ]);
  });
});
