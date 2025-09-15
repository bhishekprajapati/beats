import { Component } from '@angular/core';
import { PlaylistBeatsView } from './playlist-beats-view/playlist-beats-view';

@Component({
  selector: 'app-page-beats',
  imports: [PlaylistBeatsView],
  templateUrl: './beats.html',
})
export class Beats {}
