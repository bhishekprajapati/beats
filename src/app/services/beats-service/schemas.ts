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
    page: z.number(),
    PageSize: z.number(),
    filter: z.enum(PUBLIC_PLAYLIST_FILTERS).optional(),
  }),

  z.object({
    playlist: z.literal('onescroll'),
    page: z.number(),
  }),

  z.object({
    playlist: z.literal('trending'),
  }),
]);
