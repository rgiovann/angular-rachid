import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-dialog-confirmacao',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  styleUrl: './dialog-confirmacao.css',
  templateUrl: './dialog-confirmacao.html',
})
export class DialogConfirmacao {
  constructor(
    private readonly dialogRef: MatDialogRef<DialogConfirmacao>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }
}
