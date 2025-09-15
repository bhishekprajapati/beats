import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BeatCard } from '@components/beat-card/beat-card';
import { BeatCardCover } from '@components/beat-card/beat-card-cover/beat-card-cover';
import { BeatCardHeader } from '@components/beat-card/beat-card-header/beat-card-header';
import { BeatCardTitle } from '@components/beat-card/beat-card-title/beat-card-title';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BeatCard, BeatCardCover, BeatCardHeader, BeatCardTitle],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('beats');
}
