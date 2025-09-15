import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import { TFilterList } from '@components/search-filters/schemas';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchFilterService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly http = inject(HttpClient);
  private readonly KEY = makeStateKey<TFilterList>('search-filters');
  private readonly URL = 'https://beat22.com/assets/data/search_filter.json';
  private readonly state = inject(TransferState);

  private async fetch(): Promise<TFilterList> {
    const data = await firstValueFrom(
      this.http.get<TFilterList>(this.URL, {
        priority: 'high',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    );

    return data;
  }

  async get(): Promise<TFilterList> {
    if (isPlatformServer(this.platformId)) {
      const hasFetched = Boolean(this.state.get(this.KEY, undefined));

      if (!hasFetched) {
        this.state.set(this.KEY, await this.fetch());
      }
    }

    return this.state.get(this.KEY, []);
  }
}
