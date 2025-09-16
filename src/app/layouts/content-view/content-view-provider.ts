import { Injectable, signal } from '@angular/core';

type ViewKind = 'grid' | 'list';

@Injectable()
export class ContentViewProvider {
  view = signal<ViewKind>('grid');

  toggle() {
    this.view.update((view) => (view === 'grid' ? 'list' : 'grid'));
  }

  isGrid() {
    return this.view() === 'grid';
  }

  isList() {
    return this.view() === 'list';
  }
}
