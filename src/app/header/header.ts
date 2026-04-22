import { Component } from '@angular/core';
import { MatToolbarModule, MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  imports: [MatToolbar],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true,
})
export class Header {}
