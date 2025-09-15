import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './globals/header/header';
import { MaxContainer } from './layouts/max-container/max-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MaxContainer],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('beats');
}
