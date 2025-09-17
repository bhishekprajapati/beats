import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-link',
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-link.html',
})
export class NavLink {
  @Input() isLinkActive!: boolean;
  @Input() variant!: 'purple' | 'cyan' | 'yellow';
  @Input() to!: string;
  @Input() queryParams?: Record<string, any>;
}
