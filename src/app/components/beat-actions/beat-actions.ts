import { Component } from '@angular/core';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardDropdownModule } from '@shared/components/dropdown/dropdown.module';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-beat-actions',
  imports: [LucideAngularModule, ZardDropdownModule, ZardButtonComponent],
  templateUrl: './beat-actions.html',
})
export class BeatActions {
  onProfile() {
    console.log('Profile clicked');
  }

  onBilling() {
    console.log('Billing clicked');
  }

  onSettings() {
    console.log('Settings clicked');
  }

  onKeyboardShortcuts() {
    console.log('Keyboard shortcuts clicked');
  }

  onTeam() {
    console.log('Team clicked');
  }

  onNewTeam() {
    console.log('New Team clicked');
  }

  onGitHub() {
    console.log('GitHub clicked');
  }

  onSupport() {
    console.log('Support clicked');
  }

  onLogout() {
    console.log('Log out clicked');
  }
}
