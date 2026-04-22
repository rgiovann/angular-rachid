export interface Despesa {
  id: string; // útil para remoção e controle
  pessoaId: string; // referência à pessoa (melhor que string solta)
  descricao: string;
  valor: number;
  data: string;
}
