import { ContentViewProvider } from '@/app/layouts/content-view/content-view-provider';
import { Component, computed, inject, Input } from '@angular/core';
import { BeatActions } from '@components/beat-actions/beat-actions';
import { BeatBuyButton } from '@components/beat-buy-button/beat-buy-button';
import { ZardBadgeComponent } from '@shared/components/badge/badge.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-beat-card',
  imports: [ZardBadgeComponent, BeatBuyButton, BeatActions, LucideAngularModule],
  templateUrl: './beat-card.html',
})
export class BeatCard {
  @Input() src!: string;
  @Input() title!: string;
  @Input() storeName!: string;
  @Input() tags!: string[];
  @Input() tempo!: number;
  @Input() prices!: {
    discount: {
      value: number;
      quantifier: 'percentage';
    };
    final_price: number;
  }[];
  @Input() key!: string;
  @Input() producer!: {
    _id: string;
    user: string;
    is_verfied: boolean;
    store: {
      general: {
        name: string;
        hide_about?: boolean;
        artist_first_name?: string;
        artist_second_name?: string;
      };
      brand: {
        picture: string;
        summary?: string;
        instagram?: string;
        youtube?: string;
      };
    };
  };

  readonly buyPrice = computed(() => this.prices[0].final_price);
  readonly transformedKey = computed(() => this.key.replaceAll('_', ' '));
  readonly isVerified = computed(() => this.producer.is_verfied);
  readonly layout = inject(ContentViewProvider);
}
