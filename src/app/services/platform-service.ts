import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PlatformService {
  private platformId = inject(PLATFORM_ID);

  isServer() {
    return isPlatformServer(this.platformId);
  }

  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }
}
