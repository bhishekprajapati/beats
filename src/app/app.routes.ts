import { Routes } from '@angular/router';
import { Beats as BeatsPage } from '@pages/beats/beats';
import { Home as Homepage } from '@pages/home/home';
import { LatestBeats } from '@pages/latest-beats/latest-beats';
import { TrendingBeats } from '@pages/trending-beats/trending-beats';

export const routes: Routes = [
  { path: '', component: Homepage },
  {
    path: 'beats',
    component: BeatsPage,
  },
  {
    path: 'trending-beats',
    component: TrendingBeats,
  },
  {
    path: 'latest-beats',
    component: LatestBeats,
  },
];
