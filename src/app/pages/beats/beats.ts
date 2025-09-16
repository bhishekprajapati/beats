import { Component } from '@angular/core';
import { PlaylistBeatsView } from './playlist-beats-view/playlist-beats-view';
import { ContentViewRoot } from '@/app/layouts/content-view/content-view-root';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { PlaylistService } from '@/app/services/playlist-service';

@Component({
  selector: 'app-page-beats',
  imports: [PlaylistBeatsView, ContentViewRoot, ZardButtonComponent],
  templateUrl: './beats.html',
})
export class Beats {
  constructor(public readonly playlist: PlaylistService) {}
}
