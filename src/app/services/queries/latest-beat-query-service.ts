import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { injectInfiniteQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { OriginService } from '../origin-service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PlatformService } from '../platform-service';
import z from 'zod';

export const FILTERS = ['wav_under_999', 'wav_stems_1999', 'beats_with_exclusive'] as const;

const filterSchema = z.object({
  filter: z.enum(FILTERS).optional(),
});

function paramMapToRecord(map: ParamMap): Record<string, string | null> {
  const queryParams: Record<string, string | null> = {};

  map.keys.forEach((key) => {
    const value = map.get(key);
    queryParams[key] = value;
  });

  return queryParams;
}

export function getValidatedFilter(map: ParamMap) {
  const params = paramMapToRecord(map);
  const result = filterSchema.safeParse(params);
  return result.data ?? null;
}

@Injectable()
export class LatestBeatQueryService {
  private readonly path = signal('/');

  private readonly platform = inject(PlatformService);
  private readonly http = inject(HttpClient);
  private readonly origin = inject(OriginService);
  readonly queryClient = inject(QueryClient);
  readonly filter = signal<(typeof FILTERS)[number] | null>(null);

  readonly hasWavUnder999Filter = computed(() => this.filter() === 'wav_under_999');
  readonly hasWavStemsUnder1999Filter = computed(() => this.filter() === 'wav_stems_1999');
  readonly hasBeatsWithExclusiveFilter = computed(() => this.filter() === 'beats_with_exclusive');

  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe((segments) => {
      this.path.set(segments.map((s) => s.path).join('/'));
    });

    if (this.platform.isServer()) {
      this.filter.set(getValidatedFilter(this.route.snapshot.queryParamMap)?.filter ?? null);
    } else {
      this.route.queryParamMap.subscribe((params) => {
        this.filter.set(getValidatedFilter(params)?.filter ?? null);
      });
    }
  }

  readonly query = injectInfiniteQuery(() => ({
    queryKey: ['latest-beat-query-service', this.filter()],
    queryFn: async ({ pageParam }) => {
      const url = this.origin.url('/api/v2/beat/public-list');
      const filter = this.filter();
      const beatFilter = filter ? { [filter]: true } : {};
      const page = { limit: 50, offset: (pageParam - 1) * 50 };

      const result = await lastValueFrom(
        this.http.post<TQueryResult>(url, {
          ...beatFilter,
          ...page,
        }),
      );

      if (result.status === 'success') {
        return result.data;
      }

      throw Error('failed to fetch');
    },
    initialPageParam: 1,
    getNextPageParam(_, __, lastPageParam) {
      return lastPageParam + 1;
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

type TQueryResult =
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
        prices: {
          discount: {
            value: number;
            quantifier: 'percentage';
          };
          final_price: number;
        }[];
      }[];
    }
  | {
      status: 'error';
    };
