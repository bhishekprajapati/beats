import { Component, inject } from '@angular/core';
import { ContentViewRoot } from '@/app/layouts/content-view/content-view-root';
import { OneScrollQuerySerivce } from '@/app/services/queries/one-scroll-beat-query-service';
import { ContentViewContent } from '@/app/layouts/content-view/content-view-content/content-view-content';
import { ZardLoaderComponent } from '@shared/components/loader/loader.component';
import { InViewDirective } from '@/app/directives/in-view-directive';
import { ContentViewItem } from '@/app/layouts/content-view/content-view-item/content-view-item';
import { BeatCard } from '@components/beat-card/beat-card';
import { ContentViewToggle } from '@/app/layouts/content-view/content-view-toggle/content-view-toggle';

@Component({
  selector: 'app-page-beats',
  imports: [
    ContentViewRoot,
    ContentViewContent,
    ContentViewItem,
    ContentViewToggle,
    BeatCard,
    ZardLoaderComponent,
    InViewDirective,
  ],
  templateUrl: './beats.html',
  providers: [OneScrollQuerySerivce],
})
export class Beats {
  query = inject(OneScrollQuerySerivce);
}
