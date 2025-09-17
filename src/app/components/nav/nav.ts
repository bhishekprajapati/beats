import { PlatformService } from '@/app/services/platform-service';
import { FILTERS, getValidatedFilter } from '@/app/services/queries/latest-beat-query-service';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavLink } from '@components/nav-link/nav-link';

@Component({
  selector: 'app-nav',
  imports: [NavLink],
  templateUrl: './nav.html',
})
export class Nav {
  private readonly path = signal('/');
  private readonly platform = inject(PlatformService);

  readonly isBeatsPage = computed(() => this.path().startsWith('beats'));
  readonly isTrendingBeatsPage = computed(() => this.path().startsWith('trending-beats'));
  readonly isLatestBeatPage = computed(() => this.path().startsWith('latest-beats'));

  private filter = signal<(typeof FILTERS)[number] | null>(null);

  readonly hasWavUnder999Filter = computed(() => this.filter() === 'wav_under_999');
  readonly hasWavStemsUnder1999Filter = computed(() => this.filter() === 'wav_stems_1999');
  readonly hasBeatsWithExclusiveFilter = computed(() => this.filter() === 'beats_with_exclusive');

  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe((segments) => {
      this.path.set(segments.map((s) => s.path).join('/'));
    });

    if (this.platform.isServer()) {
      this.filter.set(getValidatedFilter(this.route.snapshot.queryParamMap)?.filter ?? null);
    } else {
      this.route.queryParamMap.subscribe((map) =>
        this.filter.set(getValidatedFilter(map)?.filter ?? null),
      );
    }
  }
}
