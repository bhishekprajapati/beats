import { Component, inject } from '@angular/core';
import { ContentViewProvider } from '../content-view-provider';

@Component({
  selector: 'app-content-view-content',
  imports: [],
  templateUrl: './content-view-content.html',
})
export class ContentViewContent {
  readonly view = inject(ContentViewProvider);
}
