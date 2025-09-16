import { Component, inject } from '@angular/core';
import { ContentViewProvider } from '../content-view-provider';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-content-view-toggle',
  templateUrl: './content-view-toggle.html',
  imports: [LucideAngularModule],
})
export class ContentViewToggle {
  readonly layout = inject(ContentViewProvider);
}
