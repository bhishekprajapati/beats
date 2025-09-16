import { Component } from '@angular/core';
import { PlaylistBeatsView } from './playlist-beats-view/playlist-beats-view';
import { ContentViewRoot } from '@/app/layouts/content-view/content-view-root';

@Component({
  selector: 'app-page-beats',
  imports: [PlaylistBeatsView, ContentViewRoot],
  templateUrl: './beats.html',
})
export class Beats {}
