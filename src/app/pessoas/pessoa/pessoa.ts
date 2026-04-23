import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { type Pessoa as PessoaModel } from '../pessoa.model';

@Component({
  selector: 'app-pessoa',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './pessoa.html',
  styleUrl: './pessoa.css',
  standalone: true,
})
export class Pessoa {
  @Input({ required: true }) pessoa!: PessoaModel;
  @Output() remover = new EventEmitter<PessoaModel>();

  removerPessoa() {
    this.remover.emit(this.pessoa);
  }
}
