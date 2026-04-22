import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pessoa',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './pessoa.html',
  styleUrl: './pessoa.css',
  standalone: true,
})
export class Pessoa {
  removerPessoa() {
    throw new Error('Method not implemented.');
  }
  @Input() nome = '';

  ngOnChanges() {
    console.log('INPUT RECEBIDO NO FILHO:', this.nome);
  }
}
