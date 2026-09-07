import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { GalleryApp } from './app.model';
import { APP_LONG_DESCRIPTIONS } from './app-long-descriptions';

interface AppStoreLookupResponse {
  results?: Array<{ description?: string; screenshotUrls?: string[] }>;
}

@Injectable({ providedIn: 'root' })
export class AppStoreDescriptionService {
  private readonly http = inject(HttpClient);

  getDescription(app: GalleryApp): Observable<string> {
    const appId = app.appStoreUrl.match(/id(\d+)/)?.[1];
    const fallback = APP_LONG_DESCRIPTIONS[app.slug] ?? app.description;

    if (!appId) {
      return of(fallback);
    }

    return this.http.get<AppStoreLookupResponse>(`https://itunes.apple.com/lookup?id=${appId}`).pipe(
      map(response => response.results?.[0]?.description?.trim() || fallback),
      catchError(() => of(fallback))
    );
  }

  getScreenshots(app: GalleryApp): Observable<string[]> {
    const appId = app.appStoreUrl.match(/id(\d+)/)?.[1];

    if (!appId) {
      return of([]);
    }

    return this.http.get<AppStoreLookupResponse>(`https://itunes.apple.com/lookup?id=${appId}`).pipe(
      map(response => response.results?.[0]?.screenshotUrls ?? []),
      catchError(() => of([]))
    );
  }
}
