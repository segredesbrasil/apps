import { RenderMode, ServerRoute } from '@angular/ssr';
import { APPS } from './app-data';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  {
    path: 'apps/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => APPS.map(app => ({ slug: app.slug }))
  },
  { path: '**', renderMode: RenderMode.Prerender }
];