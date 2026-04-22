import { Component, NgZone, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Pessoa } from './pessoa/pessoa';
import { NovaPessoa } from './nova-pessoa/nova-pessoa';
import { Pessoa as PessoaModel } from './pessoa.model';
import { DialogAviso } from '../shared/dialog-aviso/dialog-aviso';
import { PessoasService } from './pessoas.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-pessoas',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, Pessoa],
  templateUrl: './pessoas.html',
  styleUrl: './pessoas.css',
  standalone: true,
})
export class Pessoas implements OnInit {
  pessoas: PessoaModel[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly pessoasService: PessoasService,
    //private readonly ngZone: NgZone,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.pessoas = this.pessoasService.getAll();
  }

  abrirDialogNovaPessoa(): void {
    const dialogRef = this.dialog.open(NovaPessoa, {
      width: '420px',
    });

    dialogRef.afterClosed().subscribe((nome: string | undefined) => {
      if (!nome) return;

      setTimeout(() => {
        const resultado = this.pessoasService.add(nome);

        if (!resultado.sucesso) {
          this.dialog.open(DialogAviso, {
            data: resultado.erro,
          });
          return;
        }

        this.pessoas = this.pessoasService.getAll();

        this.cdr.detectChanges();
      });
    });
  }

  log(value: any): string {
    console.log('RENDER:', value);
    return '';
  }
}
