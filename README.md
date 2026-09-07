# Field Notes / App Gallery

An English-language Angular standalone website for showcasing 26 App Store apps. It uses a single typed catalog to power the homepage, filters, detail routes, and static prerender output.

## Requirements

- Node.js 20.19 or newer
- npm 10 or newer

## Setup

```bash
npm install
npm start
```

Open `http://localhost:4200` in a browser during development.

## Build and prerender

```bash
npm run build
```

The Angular application builder produces the browser bundle and statically prerenders the homepage plus all 26 `/apps/:slug` detail pages into `dist/app-gallery/browser`. The server entry is included for an optional SSR server run:

```bash
npm run serve:ssr
```

## Editing app data

All app content lives in [src/app/app-data.ts](src/app/app-data.ts). Edit an item in the `APPS` array to replace its:

- `name`, `shortDescription`, and longer `description`
- `icon` fallback initials, official Apple `iconUrl`, and `accent` color
- `category` and display `number`
- `appStoreUrl` and `tiktokUrl`

The `slug` becomes the detail page URL, for example `slug: 'frame'` creates `/apps/frame`. Keep slugs lowercase and unique. When changing a slug, update the matching line in [src/prerender-routes.txt](src/prerender-routes.txt) so the detail page is included in the static build. The `CATEGORIES` list controls the homepage filter tabs. To replace the placeholder links, change the two URL fields for each app; no component edits are needed.

## Project shape

- `src/app/app-data.ts` - centralized app catalog
- `src/app/home.component.ts` - filterable editorial homepage
- `src/app/detail.component.ts` - reusable detail page
- `src/app/app-store-description.service.ts` - official App Store descriptions during SSR/prerender
- `src/app/app-long-descriptions.ts` - local fallback descriptions when the App Store endpoint is unavailable
- `src/app/app.routes.server.ts` - prerender route generation
- `src/prerender-routes.txt` - static homepage and detail URLs
- `src/styles.css` - global design tokens and typography