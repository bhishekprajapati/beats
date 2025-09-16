import { computed, inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import z from 'zod';
import { PlatformService } from './platform-service';
import { fa } from 'zod/v4/locales';

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

function paramMapToRecord(map: ParamMap): Record<string, string | null> {
  const queryParams: Record<string, string | null> = {};

  map.keys.forEach((key) => {
    const value = map.get(key);
    queryParams[key] = value;
  });

  return queryParams;
}

function getValidatedQueryParams(map: ParamMap) {
  const params = paramMapToRecord(map);
  const result = playlistQueryOptions.safeParse(params);
  return result.data ?? { playlist: 'onescroll', page: 1 };
}

export type TPlaylistKind = TPlaylistQueryOptions['playlist'];
export type SelectPlaylistKind<K extends TPlaylistKind> = K;

@Injectable({
  providedIn: 'root',
})
export class PlaylistQueryOptionsProvider {
  readonly opts = signal<TPlaylistQueryOptions | undefined>(undefined);
  readonly isTrendingActive = computed(() => this.opts()?.playlist === 'trending');
  readonly isLatestActive = computed(() => this.opts()?.playlist === 'latest');
  readonly isOneScrollActive = computed(() => this.opts()?.playlist === 'onescroll');

  readonly hasWavUnder999Filter = computed(() => {
    const opts = this.opts();
    return (opts && opts.playlist === 'latest' && opts.filter === 'wav_under_999') ?? false;
  });

  readonly hasWavStemsUnder1999Filter = computed(() => {
    const opts = this.opts();
    return (opts && opts.playlist === 'latest' && opts.filter === 'wav_stems_1999') ?? false;
  });

  readonly hasBeatsWithExclusiveFilter = computed(() => {
    const opts = this.opts();
    return (opts && opts.playlist === 'latest' && opts.filter === 'beats_with_exclusive') ?? false;
  });

  private readonly router = inject(Router);

  constructor(
    private route: ActivatedRoute,
    private platform: PlatformService,
  ) {
    if (this.platform.isServer()) {
      this.opts.set(getValidatedQueryParams(this.route.snapshot.paramMap));
    } else {
      this.route.queryParamMap.subscribe((params) => {
        this.opts.set(getValidatedQueryParams(params));
      });
    }
  }

  updateOptions(opts?: TPlaylistQueryOptions, skipUrlUpdate = false) {
    if (this.platform.isBrowser()) {
      if (skipUrlUpdate) {
        this.opts.set(opts);
      } else {
        this.router.navigate([], {
          queryParams: opts ?? {},
          replaceUrl: true,
        });
      }
    }
  }
}
