import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-aviso',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Aviso</h2>

    <div mat-dialog-content>
      {{ data }}
    </div>

    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>OK</button>
    </div>
  `,
})
export class DialogAviso {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}
