import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { OriginService } from '../origin-service';

@Injectable()
export class TrendingQueryService {
  readonly queryClient = inject(QueryClient);
  private readonly http = inject(HttpClient);
  private readonly origin = inject(OriginService);
  query = injectQuery(() => ({
    queryKey: ['trending-query-service'],
    queryFn: async () => {
      const url = this.origin.url(`/api/v2/playlist/trending?days=2&limit=50`);
      const data = await lastValueFrom(this.http.get<TQueryResult>(url));
      return data;
    },
  }));
}

type TProducer = {
  _id: string;
  user: string;
  is_verfied: boolean;
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
  playlists: {
    title: string;
    beatSerialNumbers: number[];
    authorName: string;
    isOfficialPlaylist: boolean;
    isPublic: true;
    urlSlug: string;
    updatedAt: Date;
    category: string;
    beats: {
      _id: string;
      serial_number: number;
      title: string;
      category: string;
      mood: string[];
      genre: string;
      key: string;
      tag: string[];
      preview: string;
      cover_picture: string;
      is_used_sample: boolean;
      owner: string;
      play_count: number;
      disable_mp3_downloads: boolean;
      producer: TProducer;
      tempo: number;
      prices: {
        discount: {
          value: number;
          quantifier: 'percentage';
        };
        final_price: number;
      }[];
    }[];
  }[];
};
