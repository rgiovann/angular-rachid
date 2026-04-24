import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PreventBlurDirective } from '../../shared/directives/prevent-blur.directive';

import { PessoasService } from '../../pessoas/pessoas.service';
import { DespesasService } from '../despesas.service';
import { type Pessoa } from '../../pessoas/pessoa.model';

@Component({
  selector: 'app-nova-despesa',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    PreventBlurDirective,
  ],
  templateUrl: './nova-despesa.html',
  styleUrl: './nova-despesa.css',
})
export class NovaDespesa {
  pessoas: Pessoa[] = [];
  submetido: boolean = false;
  form = new FormGroup({
    pessoaId: new FormControl<string | null>(null, Validators.required),
    descricao: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    data: new FormControl<Date | null>(new Date(), Validators.required),
    valor: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)]),
  });

  constructor(
    private readonly dialogRef: MatDialogRef<NovaDespesa>,
    private readonly pessoasService: PessoasService,
    private readonly despesasService: DespesasService,
  ) {
    // snapshot simples (suficiente aqui)
    this.pessoasService.pessoas$.subscribe((lista) => {
      this.pessoas = lista;
    });
  }

  fechar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    this.submetido = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { pessoaId, descricao, data, valor } = this.form.getRawValue();

    const resultado = this.despesasService.add({
      pessoaId: pessoaId!,
      descricao: descricao!,
      valor: valor!,
      data: data!.toISOString(), // 🔥 conversão importante
    });

    if (!resultado.sucesso) {
      // exemplo: erro genérico vindo do service
      this.form.setErrors({ erro: resultado.erro });
      return;
    }

    this.dialogRef.close(true);
  }
}
