import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { injectInfiniteQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { OriginService } from '../origin-service';

@Injectable()
export class OneScrollQuerySerivce {
  readonly queryClient = inject(QueryClient);
  private readonly http = inject(HttpClient);
  private readonly origin = inject(OriginService);

  infiniteQuery = injectInfiniteQuery(() => ({
    initialPageParam: 0,
    queryKey: ['one-scroll-query-service'],
    queryFn: async ({ signal, pageParam }) => {
      const url = this.origin.url(`/api/v2/playlist/oneScroll/${pageParam}`);
      const data = await lastValueFrom(this.http.get<TQueryResult>(url));
      return data;
    },
    getNextPageParam(lastPage) {
      return lastPage.pageNumber + 1;
    },
  }));
}

type TProducer = {
  _id: string;
  user: string;
  is_verified: false;
  store: {
    general: {
      name: string;
      hide_about?: boolean;
      artist_first_name?: string;
      artist_second_name?: string;
    };
    brand: {
      picture: string;
      summary?: string;
      instagram?: string;
      youtube?: string;
    };
  };
};

type TQueryResult = {
  pageNumber: number;
  beatsPerPage: number;
  beats: Array<{
    _id: string;
    id: string;
    serial_number: number;
    title: string;
    category: string;
    mood: string[];
    genre: string;
    key: string;
    tempo: number;
    instrument: string[];
    tag: string[];
    preview: string;
    cover_picture: string;
    is_used_sample: boolean;
    owner: string;
    play_count: number;
    disable_mp3_download: false;
    allow_negotiations: false;
    created_by: {
      _id: string;
      allow_negotiations: boolean;
      handle: string;
    };
    producer: TProducer;
    prices: {
      discount: {
        value: number;
        quantifier: 'percentage';
      };
      final_price: number;
    }[];
  }>;
  oneScrollComputedAt: Date;
};
