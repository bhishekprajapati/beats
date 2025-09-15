import { Routes } from '@angular/router';
import { Beats as BeatsPage } from '@pages/beats/beats';
import { Home as Homepage } from '@pages/home/home';

export const routes: Routes = [
  { path: '', component: Homepage },
  {
    path: 'beats',
    component: BeatsPage,
  },
];
