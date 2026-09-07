import { DOCUMENT, AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { APPS } from './app-data';
import { AppStoreDescriptionService } from './app-store-description.service';

@Component({
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (app) {
      <article class="detail" [style.--accent]="app.accent">
        <div class="detail-top"><a routerLink="/" class="back-link">← All apps</a><span class="detail-index">{{ app.number }} / {{ totalApps }}</span></div>
        <div class="detail-hero"><div class="detail-icon"><img [src]="app.iconUrl" [alt]="app.name + ' app icon'" width="260" height="260"></div><div><p class="eyebrow">{{ app.category }} / Field Notes</p><h1>{{ app.name }}</h1><p class="lede">{{ app.shortDescription }}</p></div></div>
        @if (screenshots$ | async; as screenshots) { @if (screenshots.length) { <section class="screenshots" aria-labelledby="screenshots-title"><div class="body-label" id="screenshots-title">Inside the app</div><div class="screenshot-grid">@for (screenshot of screenshots; track screenshot) { <img [src]="screenshot" [alt]="app.name + ' App Store preview'" loading="lazy" width="320" height="480"> }</div></section> } }
        <div class="detail-body"><div class="body-label">The idea</div><div class="body-copy"><p class="summary">{{ app.description }}</p>@if (description$ | async; as officialDescription) { <div class="long-description">@for (paragraph of getParagraphs(officialDescription); track $index) { <p>{{ paragraph }}</p> }</div> }<div class="link-row"><a class="primary-link" [href]="app.appStoreUrl" target="_blank" rel="noreferrer">View on App Store <span>↗</span></a><a class="secondary-link" [href]="app.tiktokUrl" target="_blank" rel="noreferrer">Follow on TikTok <span>↗</span></a></div></div></div>
        <div class="detail-footer"><span>Designed for a little more intention.</span><span class="accent-line"></span><a routerLink="/">Browse the collection ↗</a></div>
      </article>
    } @else { <section class="missing"><p class="eyebrow">404 / Not found</p><h1>That app<br><em>got away.</em></h1><a class="primary-link" routerLink="/">Return to catalog ↗</a></section> }
  `,
  styles: [`
    :host { display: block; }.detail, .missing { margin: 0 auto; max-width: 1320px; padding: 30px 36px 100px; }.detail-top { display: flex; justify-content: space-between; }.back-link, .detail-index, .eyebrow, .body-label, .detail-footer { font-family: var(--mono); font-size: .64rem; letter-spacing: .1em; text-transform: uppercase; }.back-link { color: var(--muted); text-decoration: none; }.back-link:hover { color: var(--signal); }.detail-index { color: var(--muted); }.detail-hero { align-items: center; display: grid; gap: clamp(35px, 8vw, 130px); grid-template-columns: 260px 1fr; margin: clamp(100px, 15vw, 190px) 0 130px; }.detail-icon { background: var(--accent); height: 260px; overflow: hidden; width: 260px; }.detail-icon img { display: block; height: 100%; object-fit: cover; width: 100%; }.eyebrow { color: var(--accent); margin-bottom: 20px; }.detail h1, .missing h1 { font-family: var(--serif); font-size: clamp(5rem, 13vw, 12rem); font-weight: 400; letter-spacing: -.07em; line-height: .76; }.lede { color: var(--muted); font-size: 1.1rem; line-height: 1.45; margin-top: 34px; max-width: 320px; }.screenshots { border-top: 1px solid var(--line); padding-top: 28px; }.screenshot-grid { display: flex; flex-wrap: nowrap; gap: 10px; margin-top: 24px; overflow-x: auto; padding-bottom: 8px; scrollbar-width: thin; }.screenshot-grid img { aspect-ratio: 2 / 3; background: var(--card); display: block; flex: 0 0 clamp(82px, 9vw, 124px); height: auto; object-fit: contain; width: clamp(82px, 9vw, 124px); }.detail-body { border-top: 1px solid var(--line); display: grid; gap: 30px; grid-template-columns: 260px 1fr; margin-top: 90px; padding-top: 28px; }.body-label { color: var(--accent); }.body-copy { max-width: 820px; }.body-copy p { margin: 0; }.summary { font-family: var(--serif); font-size: clamp(1.8rem, 3.5vw, 3.5rem); letter-spacing: -.045em; line-height: 1.02; }.long-description { color: var(--muted); font-size: 1.05rem; line-height: 1.65; margin-top: 34px !important; max-width: 700px; }.long-description p + p { margin-top: 22px; }.link-row { align-items: center; display: flex; gap: 25px; margin-top: 60px; }.primary-link, .secondary-link { font-family: var(--mono); font-size: .68rem; letter-spacing: .08em; text-decoration: none; text-transform: uppercase; }.primary-link { background: var(--ink); color: var(--paper); padding: 16px 18px; }.primary-link:hover { background: var(--signal); color: var(--ink); }.secondary-link { color: var(--muted); }.secondary-link:hover { color: var(--signal); }.primary-link span, .secondary-link span { color: var(--accent); font-size: 1rem; margin-left: 10px; }.detail-footer { align-items: center; border-top: 1px solid var(--line); color: var(--muted); display: flex; gap: 18px; margin-top: 120px; padding-top: 16px; }.detail-footer a { color: var(--ink); margin-left: auto; text-decoration: none; }.accent-line { border-top: 2px solid var(--accent); width: 40px; }.missing { padding-top: 150px; }.missing h1 { font-size: clamp(5rem, 12vw, 11rem); margin-bottom: 55px; }.missing em { color: var(--signal); font-style: italic; }
    @media (max-width: 700px) { .detail, .missing { padding: 24px 20px 70px; }.detail-hero { display: block; margin: 100px 0 90px; }.detail-icon { height: 150px; margin-bottom: 55px; width: 150px; }.screenshot-grid img { flex-basis: 82px; width: 82px; }.detail-body { display: block; }.body-label { margin-bottom: 30px; }.link-row { align-items: flex-start; flex-direction: column; gap: 20px; margin-top: 45px; }.detail-footer { align-items: flex-start; flex-direction: column; margin-top: 90px; }.detail-footer a { margin-left: 0; }.accent-line { order: 2; }.detail-footer a { order: 3; } }
  `]
})
export class DetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly appStoreDescription = inject(AppStoreDescriptionService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  readonly totalApps = APPS.length;
  readonly app = APPS.find(item => item.slug === this.route.snapshot.paramMap.get('slug'));
  readonly description$ = this.app ? this.appStoreDescription.getDescription(this.app) : null;
  readonly screenshots$ = this.app ? this.appStoreDescription.getScreenshots(this.app) : null;

  constructor() {
    if (this.app) {
      const pageTitle = `${this.app.name} | Code Crafts BR`;
      this.title.setTitle(pageTitle);
      this.meta.updateTag({ name: 'description', content: this.app.shortDescription });
      this.meta.updateTag({ property: 'og:title', content: pageTitle });
      this.meta.updateTag({ property: 'og:description', content: this.app.shortDescription });
      this.meta.updateTag({ property: 'og:image', content: this.app.iconUrl });
      this.meta.updateTag({ property: 'og:url', content: `https://segredesbrasil.github.io/apps/apps/${this.app.slug}` });
      const canonical = this.document.querySelector('link[rel="canonical"]') ?? this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', `https://segredesbrasil.github.io/apps/apps/${this.app.slug}`);
      this.document.head.appendChild(canonical);
    }
  }

  getParagraphs(description: string): string[] {
    return description.split(/\n\s*\n/).map(paragraph => paragraph.trim()).filter(Boolean);
  }
}