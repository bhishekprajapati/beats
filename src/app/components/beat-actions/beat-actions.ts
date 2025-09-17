import { Component, Input } from '@angular/core';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardDropdownModule } from '@shared/components/dropdown/dropdown.module';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-beat-actions',
  imports: [LucideAngularModule, ZardDropdownModule, ZardButtonComponent],
  templateUrl: './beat-actions.html',
})
export class BeatActions {}
