export interface RateioTransferencia {
  devedorId: string;
  devedorNome: string;
  credorId: string;
  credorNome: string;
  valor: number;
}

export interface RateioSaldoPessoa {
  pessoaId: string;
  pessoaNome: string;
  totalPago: number;
  saldo: number;
}

export interface RateioResultado {
  totalGasto: number;
  valorPorPessoa: number;
  transferencias: RateioTransferencia[];
  saldos: RateioSaldoPessoa[];
}
