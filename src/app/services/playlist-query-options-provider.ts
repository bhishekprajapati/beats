import { Injectable, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import z from 'zod';

export const PUBLIC_PLAYLIST_FILTERS = [
  'wav_under_999',
  'wav_stems_1999',
  'beats_with_exclusive',
] as const;

export type TPlaylistQueryOptions = z.infer<typeof playlistQueryOptions>;
export const playlistQueryOptions = z.discriminatedUnion('playlist', [
  z.object({
    playlist: z.literal('latest'),
    page: z.coerce.number(),
    pageSize: z.coerce.number(),
    filter: z.enum(PUBLIC_PLAYLIST_FILTERS).optional(),
  }),

  z.object({
    playlist: z.literal('onescroll'),
    page: z.coerce.number(),
  }),

  z.object({
    playlist: z.literal('trending'),
    page: z.coerce.number(),
    pageSize: z.coerce.number(),
  }),
]);

export type TPlaylistKind = TPlaylistQueryOptions['playlist'];
export type SelectPlaylistKind<K extends TPlaylistKind> = K;

@Injectable({
  providedIn: 'root',
})
export class PlaylistQueryOptionsProvider {
  opts = signal<TPlaylistQueryOptions | undefined>(undefined);

  constructor(private route: ActivatedRoute) {
    const keys = this.route.snapshot.queryParamMap.keys;
    const queryParams: Record<any, any> = {};

    keys.forEach((key) => {
      const value = this.route.snapshot.queryParamMap.get(key);
      queryParams[key] = value;
    });

    const result = playlistQueryOptions
      .default({
        playlist: 'onescroll',
        page: 1,
      })
      .safeParse(queryParams);

    this.opts.set(result.data ?? { playlist: 'onescroll', page: 1 });
  }
}
