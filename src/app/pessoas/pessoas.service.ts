import { Injectable } from '@angular/core';
import { Pessoa } from './pessoa.model';

@Injectable({
  providedIn: 'root',
})
export class PessoasService {
  private readonly STORAGE_KEY = 'pessoas';

  private pessoas: Pessoa[] = [];

  constructor() {
    console.log('SERVICE INSTANCE', this);
    this.load();
  }

  getAll(): Pessoa[] {
    return [...this.pessoas];
  }

  add(nome: string): { sucesso: boolean; erro?: string } {
    const nomeNormalizado = nome.trim();

    if (!nomeNormalizado) {
      return { sucesso: false, erro: 'Nome inválido' };
    }

    const existe = this.pessoas.some((p) => p.nome.toLowerCase() === nomeNormalizado.toLowerCase());

    if (existe) {
      return { sucesso: false, erro: 'Pessoa já existe' };
    }

    const novaPessoa: Pessoa = {
      id: crypto.randomUUID(),
      nome: nomeNormalizado,
    };

    this.pessoas = [...this.pessoas, novaPessoa];
    this.save();

    return { sucesso: true };
  }

  private load(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    this.pessoas = data ? JSON.parse(data) : [];
  }

  private save(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.pessoas));
  }
}
