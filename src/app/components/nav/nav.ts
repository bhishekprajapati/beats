import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavLink } from '@components/nav-link/nav-link';

@Component({
  selector: 'app-nav',
  imports: [NavLink],
  templateUrl: './nav.html',
})
export class Nav {
  private readonly path = signal('/');
  readonly isBeatsPage = computed(() => this.path().startsWith('beats'));
  readonly isTrendingBeatsPage = computed(() => this.path().startsWith('trending-beats'));

  readonly isLatestBeatPage = computed(() => false);
  readonly hasWavUnder999Filter = computed(() => false);
  readonly hasWavStemsUnder1999Filter = computed(() => false);
  readonly hasBeatsWithExclusiveFilter = computed(() => false);

  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe((segments) => {
      this.path.set(segments.map((s) => s.path).join('/'));
    });

    console.log(this.path());
  }
}
