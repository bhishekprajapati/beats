import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import {
  provideTanStackQuery,
  QueryClient,
  withDevtools,
} from '@tanstack/angular-query-experimental';
import {
  Download,
  EllipsisVertical,
  Grid2x2,
  Heart,
  LucideAngularModule,
  Menu,
  Play,
  Share2,
  ShoppingCart,
} from 'lucide-angular';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideTanStackQuery(new QueryClient(), withDevtools()),
    importProvidersFrom(
      LucideAngularModule.pick({
        Menu,
        Grid2x2,
        ShoppingCart,
        Play,
        EllipsisVertical,
        Share2,
        Download,
        Heart,
      }),
    ),
  ],
};
