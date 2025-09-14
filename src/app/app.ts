import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ZardButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ZardButtonComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('beats');
}
