import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-beat-card-cover',
  imports: [],
  templateUrl: './beat-card-cover.html',
})
export class BeatCardCover {
  @Input() src!: string;
}
