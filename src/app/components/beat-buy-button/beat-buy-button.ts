import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-beat-buy-button',
  imports: [LucideAngularModule],
  templateUrl: './beat-buy-button.html',
})
export class BeatBuyButton {
  @Input() buy_price!: number;
  @Input() isSmall = false;
}
