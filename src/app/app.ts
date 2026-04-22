import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Pessoas } from './pessoas/pessoas';
import { Despesas } from './despesas/despesas';
import { Rateio } from './rateio/rateio';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Pessoas, Despesas, Rateio],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('rachid');
}
