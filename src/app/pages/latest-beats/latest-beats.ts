import { ContentViewContent } from '@/app/layouts/content-view/content-view-content/content-view-content';
import { ContentViewItem } from '@/app/layouts/content-view/content-view-item/content-view-item';
import { ContentViewRoot } from '@/app/layouts/content-view/content-view-root';
import { ContentViewToggle } from '@/app/layouts/content-view/content-view-toggle/content-view-toggle';
import { Component, inject } from '@angular/core';
import { BeatCard } from '@components/beat-card/beat-card';
import { LatestBeatQueryService } from '../../services/queries/latest-beat-query-service';
import { Nav } from '@components/nav/nav';
import { ZardLoaderComponent } from '@shared/components/loader/loader.component';

@Component({
  selector: 'app-latest-beats',
  imports: [
    ContentViewRoot,
    ContentViewContent,
    ContentViewItem,
    ContentViewToggle,
    BeatCard,
    Nav,
    ZardLoaderComponent,
  ],
  templateUrl: './latest-beats.html',
  providers: [LatestBeatQueryService],
})
export class LatestBeats {
  readonly query = inject(LatestBeatQueryService);
}
