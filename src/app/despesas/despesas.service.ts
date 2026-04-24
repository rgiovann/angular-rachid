import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { type Despesa } from './despesa.model';

@Injectable({
  providedIn: 'root',
})
export class DespesasService {
  private readonly STORAGE_KEY = 'despesas';

  private readonly despesasSubject = new BehaviorSubject<Despesa[]>([]);
  readonly despesas$ = this.despesasSubject.asObservable();

  constructor() {
    this.load();
  }

  add(despesa: Omit<Despesa, 'id'>): { sucesso: boolean; erro?: string } {
    // validações básicas (mínimas por enquanto)
    if (!despesa.descricao.trim()) {
      return { sucesso: false, erro: 'Descrição inválida' };
    }

    if (despesa.valor <= 0) {
      return { sucesso: false, erro: 'Valor deve ser maior que zero' };
    }

    if (!despesa.pessoaId) {
      return { sucesso: false, erro: 'Pessoa é obrigatória' };
    }

    const novaDespesa: Despesa = {
      ...despesa,
      id: crypto.randomUUID(),
    };

    const atual = this.despesasSubject.value;
    const novaLista = [...atual, novaDespesa];

    this.despesasSubject.next(novaLista);
    this.save(novaLista);

    return { sucesso: true };
  }

  remove(id: string): void {
    const atual = this.despesasSubject.value;
    const novaLista = atual.filter((d) => d.id !== id);

    this.despesasSubject.next(novaLista);
    this.save(novaLista);
  }

  private load(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    const lista: Despesa[] = data ? JSON.parse(data) : [];

    this.despesasSubject.next(lista);
  }

  private save(lista: Despesa[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lista));
  }

  removeByPessoaId(pessoaId: string): void {
    const atual = this.despesasSubject.value;

    const novaLista = atual.filter((d) => d.pessoaId !== pessoaId);

    this.despesasSubject.next(novaLista);
    this.save(novaLista);
  }

  temDespesas(): boolean {
    return this.despesasSubject.value.length > 0;
  }

  clear(): void {
    this.despesasSubject.next([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  get snapshot(): Despesa[] {
    return this.despesasSubject.value;
  }
}
