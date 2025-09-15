import { Component, inject } from '@angular/core';
import { BeatCard } from '@components/beat-card/beat-card';
import { BeatCardCover } from '@components/beat-card/beat-card-cover/beat-card-cover';
import { BeatCardHeader } from '@components/beat-card/beat-card-header/beat-card-header';
import { BeatCardTitle } from '@components/beat-card/beat-card-title/beat-card-title';
import { PlaylistService } from 'src/app/services/playlist-service';

@Component({
  selector: 'app-playlist-beats-view',
  imports: [BeatCard, BeatCardCover, BeatCardHeader, BeatCardTitle],
  templateUrl: './playlist-beats-view.html',
})
export class PlaylistBeatsView {
  readonly playlist = inject(PlaylistService);
}
