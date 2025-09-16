import { ContentViewProvider } from '@/app/layouts/content-view/content-view-provider';
import { Component, computed, inject, Input } from '@angular/core';
import { BeatActions } from '@components/beat-actions/beat-actions';
import { BeatBuyButton } from '@components/beat-buy-button/beat-buy-button';
import { ZardBadgeComponent } from '@shared/components/badge/badge.component';

@Component({
  selector: 'app-beat-card',
  imports: [ZardBadgeComponent, BeatBuyButton, BeatActions],
  templateUrl: './beat-card.html',
})
export class BeatCard {
  @Input() src!: string;
  @Input() title!: string;
  @Input() storeName!: string;
  @Input() tags!: string[];
  @Input() prices!: {
    discount: {
      value: number;
      quantifier: 'percentage';
    };
    final_price: number;
  }[];

  readonly buy_price = computed(() => this.prices[0].final_price);
  readonly layout = inject(ContentViewProvider);
}
