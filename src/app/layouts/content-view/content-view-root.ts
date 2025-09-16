import { Component, inject } from '@angular/core';
import { ContentViewProvider } from './content-view-provider';

@Component({
  selector: 'app-content-view-root',
  imports: [],
  templateUrl: './content-view-root.html',
  providers: [ContentViewProvider],
})
export class ContentViewRoot {}
