import { computed, Injectable, signal } from '@angular/core';

type ViewKind = 'grid' | 'list';

@Injectable()
export class ContentViewProvider {
  view = signal<ViewKind>('grid');
  readonly isGrid = computed(() => this.view() === 'grid');
  readonly isList = computed(() => this.view() === 'list');

  toggle() {
    this.view.update((view) => (view === 'grid' ? 'list' : 'grid'));
  }
}
