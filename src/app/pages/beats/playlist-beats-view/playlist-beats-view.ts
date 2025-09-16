import { ContentViewContent } from '@/app/layouts/content-view/content-view-content/content-view-content';
import { ContentViewItem } from '@/app/layouts/content-view/content-view-item/content-view-item';
import { Component, inject } from '@angular/core';
import { BeatCard } from '@components/beat-card/beat-card';
import { PlaylistService } from 'src/app/services/playlist-service';

@Component({
  selector: 'app-playlist-beats-view',
  imports: [BeatCard, ContentViewContent, ContentViewItem],
  templateUrl: './playlist-beats-view.html',
})
export class PlaylistBeatsView {
  readonly playlist = inject(PlaylistService);
}
