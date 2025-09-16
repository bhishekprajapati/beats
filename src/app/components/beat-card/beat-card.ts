import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-beat-card',
  imports: [],
  templateUrl: './beat-card.html',
})
export class BeatCard {
  @Input() src!: string;
  @Input() title!: string;
  @Input() storeName!: string;
  @Input() isCompact = false;
}
