import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { PessoasService } from '../pessoas.service';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { PreventBlurDirective } from '../../shared/directives/prevent-blur.directive';

@Component({
  selector: 'app-nova-pessoa',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    ReactiveFormsModule,
    PreventBlurDirective,
  ],
  templateUrl: './nova-pessoa.html',
  styleUrl: './nova-pessoa.css',
  standalone: true,
})
export class NovaPessoa {
  nomeControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  submetido: boolean = false;

  constructor(
    private readonly dialogRef: MatDialogRef<NovaPessoa>,
    private readonly dialog: MatDialog,
    private readonly pessoasService: PessoasService,
  ) {}

  fechar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    this.submetido = true;

    if (this.nomeControl.invalid) {
      this.nomeControl.markAsTouched();
      return;
    }

    const nome = this.nomeControl.value;

    const resultado = this.pessoasService.add(nome);

    if (!resultado.sucesso) {
      this.nomeControl.setErrors({ duplicado: true });
      return;
    }

    this.dialogRef.close(true);
  }
}
