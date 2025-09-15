import { isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OriginService {
  private readonly ORIGIN = 'https://api-server.illpeoplemusic.com';
  private readonly platformId = inject(PLATFORM_ID);

  url(endpoint: string): string {
    if (isPlatformServer(this.platformId)) {
      return `${this.ORIGIN}${endpoint}`;
    } else {
      return endpoint;
    }
  }
}
