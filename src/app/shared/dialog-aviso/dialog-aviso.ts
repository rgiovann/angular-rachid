import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-aviso',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  styleUrl: './dialog-aviso.css',
  templateUrl: './dialog-aviso.html',
})
export class DialogAviso {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}
