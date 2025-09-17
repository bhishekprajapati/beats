import { ContentViewContent } from '@/app/layouts/content-view/content-view-content/content-view-content';
import { ContentViewItem } from '@/app/layouts/content-view/content-view-item/content-view-item';
import { ContentViewRoot } from '@/app/layouts/content-view/content-view-root';
import { ContentViewToggle } from '@/app/layouts/content-view/content-view-toggle/content-view-toggle';
import { Component } from '@angular/core';
import { BeatCard } from '@components/beat-card/beat-card';
import { TrendingQueryService } from '../../services/queries/trending-query-service';
import { Nav } from '@components/nav/nav';

@Component({
  selector: 'app-trending-beats',
  imports: [ContentViewRoot, ContentViewContent, ContentViewItem, ContentViewToggle, BeatCard, Nav],
  templateUrl: './trending-beats.html',
  providers: [TrendingQueryService],
})
export class TrendingBeats {
  constructor(public query: TrendingQueryService) {}
}
