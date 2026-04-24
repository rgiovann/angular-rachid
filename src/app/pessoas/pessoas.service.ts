import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pessoa } from './pessoa.model';
import { DespesasService } from '../despesas/despesas.service';

@Injectable({
  providedIn: 'root',
})
export class PessoasService {
  private readonly STORAGE_KEY = 'pessoas';

  private readonly pessoasSubject = new BehaviorSubject<Pessoa[]>([]);
  readonly pessoas$ = this.pessoasSubject.asObservable();

  constructor(private readonly despesasService: DespesasService) {
    this.load();
  }

  add(nome: string): { sucesso: boolean; erro?: string } {
    const nomeNormalizado = nome.trim();

    if (!nomeNormalizado) {
      return { sucesso: false, erro: 'Nome inválido' };
    }

    const atual = this.pessoasSubject.value;

    const existe = atual.some((p) => p.nome.toLowerCase() === nomeNormalizado.toLowerCase());

    if (existe) {
      return { sucesso: false, erro: 'Pessoa já existe!' };
    }

    const novaPessoa: Pessoa = {
      id: crypto.randomUUID(),
      nome: nomeNormalizado,
    };

    const novaLista = [...atual, novaPessoa];

    this.pessoasSubject.next(novaLista);
    this.save(novaLista);

    return { sucesso: true };
  }

  private load(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    const lista = data ? JSON.parse(data) : [];
    this.pessoasSubject.next(lista);
  }

  private save(lista: Pessoa[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lista));
  }

  remove(id: string): void {
    const atual = this.pessoasSubject.value;

    const novaLista = atual.filter((p) => p.id !== id);

    this.pessoasSubject.next(novaLista);
    this.save(novaLista);

    // 🔥 CASCADE DELETE
    this.despesasService.removeByPessoaId(id);
  }

  temPessoas(): boolean {
    return this.pessoasSubject.value.length > 0;
  }

  clear(): void {
    this.pessoasSubject.next([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  get snapshot(): Pessoa[] {
    return this.pessoasSubject.value;
  }
}
