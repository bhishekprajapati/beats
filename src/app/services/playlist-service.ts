import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import {
  PlaylistQueryOptionsProvider,
  SelectPlaylistKind,
  TPlaylistKind,
} from './playlist-query-options-provider';
import { OriginService } from './origin-service';
import { firstValueFrom } from 'rxjs';

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

type TQueryResult =
  | {
      playlist: SelectPlaylistKind<'onescroll'>;
      result: {
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
        }>;
        oneScrollComputedAt: Date;
      };
    }
  | {
      playlist: SelectPlaylistKind<'latest'>;
      result:
        | {
            status: 'success';
            data: {
              _id: string;
              serial_number: string;
              title: string;
              type: string;
              category: string;
              mood: string[];
              genre: string;
              key: string;
              tempo: number;
              instrument: string[];
              tag: string[];
              preview: string;
              cover_picture: string;
              producer: TProducer;
            }[];
          }
        | {
            status: 'error';
          };
    }
  | {
      playlist: 'trending';
      result: {
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
          }[];
        }[];
      };
    };

type SelectQueryResult<K extends TPlaylistKind> = Extract<TQueryResult, { playlist: K }>['result'];

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private readonly http = inject(HttpClient);
  private readonly origin = inject(OriginService);

  readonly queryClient = inject(QueryClient);
  readonly query = injectQuery(() => ({
    queryKey: ['beats-service-query', this.playlistQueryOptions.opts()],
    queryFn: async ({ queryKey }): Promise<TQueryResult> => {
      const opts = queryKey[1];

      if (opts === undefined || typeof opts === 'string' || opts.playlist === 'onescroll') {
        const page = opts !== undefined && typeof opts === 'object' ? opts.page : 0;
        const url = this.origin.url(`/api/v2/playlist/oneScroll/${page}`);
        const result = await firstValueFrom(this.http.get<SelectQueryResult<'onescroll'>>(url));

        return {
          playlist: 'onescroll',
          result,
        };
      }

      if (opts.playlist === 'latest') {
        const url = this.origin.url('/api/v2/beat/public-list');
        const filter = opts.filter ? { [opts.filter]: true } : {};
        const page = { limit: opts.pageSize, offset: (opts.page - 1) * opts.pageSize };

        const result = await firstValueFrom(
          this.http.post<SelectQueryResult<'latest'>>(url, {
            ...filter,
            ...page,
          }),
        );

        return {
          playlist: 'latest',
          result,
        };
      }

      const url = this.origin.url(
        `/api/v2/playlist/trending?days=${opts.page}&limit=${opts.pageSize}`,
      );
      const result = await firstValueFrom(this.http.get<SelectQueryResult<'trending'>>(url));

      return {
        playlist: 'trending',
        result,
      };
    },
  }));

  constructor(readonly playlistQueryOptions: PlaylistQueryOptionsProvider) {}

  nextPage() {
    const opts = this.playlistQueryOptions.opts();
    const nextPageOptions = opts && { ...opts, page: opts.page + 1 };

    if (nextPageOptions) {
      this.playlistQueryOptions.updateOptions(nextPageOptions, true);
    }
  }
}
