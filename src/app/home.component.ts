import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APPS, CATEGORIES } from './app-data';

@Component({
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero">
      <div class="hero-kicker"><span>Small tools, considered</span><span>↘ Scroll to explore</span></div>
      <div class="hero-grid">
        <div class="hero-title-wrap"><p class="eyebrow">An independent app gallery</p><h1>Code<br><em>Crafts BR.</em></h1></div>
        <div class="hero-note"><p>A collection of focused apps for making a little more room in everyday life.</p><span class="hero-rule"></span><span class="hero-count">{{ apps.length }} / {{ apps.length }}<br><small>available to explore</small></span></div>
      </div>
      <div class="hero-stamp">FN<br><span>26</span></div>
    </section>

    <section class="catalog" id="catalog">
      <div class="section-heading"><div><p class="eyebrow">The collection</p><h2>App catalog</h2></div><p class="section-intro">A growing set of small, opinionated tools. Find one that fits the way you already think.</p></div>
      <div class="filters" role="tablist" aria-label="Filter apps by category">
        @for (category of categories; track category) { <button type="button" [class.active]="selectedCategory() === category" (click)="selectCategory(category)">{{ category }}</button> }
      </div>
      <div class="app-grid">
        @for (app of filteredApps(); track app.slug; let i = $index) {
          <a class="app-card" [routerLink]="['/apps', app.slug]" [style.--accent]="app.accent">
            <div class="card-top"><span class="card-number">{{ app.number }}</span><span class="card-category">{{ app.category }}</span></div>
            <div class="app-icon"><img [src]="app.iconUrl" [alt]="app.name + ' app icon'" width="74" height="74"></div>
            <div class="card-bottom"><div><h3>{{ app.name }}</h3><p>{{ app.shortDescription }}</p></div><span class="card-arrow">↗</span></div>
          </a>
        }
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .hero { margin: 0 auto; max-width: 1320px; padding: 30px 36px 88px; position: relative; }
    .hero-kicker, .eyebrow, .card-number, .card-category, .filters button { font-family: var(--mono); font-size: .64rem; letter-spacing: .1em; text-transform: uppercase; }
    .hero-kicker { color: var(--muted); display: flex; justify-content: space-between; }
    .hero-kicker span:last-child { color: var(--signal); }
    .hero-grid { align-items: end; display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(220px, .6fr); gap: 60px; margin-top: clamp(90px, 15vw, 190px); }
    .eyebrow { color: var(--signal); margin: 0 0 20px; }
    h1, h2, h3, p { margin: 0; }
    h1 { font-family: var(--serif); font-size: clamp(5rem, 13vw, 12.6rem); font-weight: 400; letter-spacing: -.065em; line-height: .76; }
    h1 em { color: var(--signal); font-style: italic; }
    .hero-note { border-left: 1px solid var(--line); color: var(--muted); font-family: var(--sans); font-size: .98rem; line-height: 1.55; max-width: 280px; padding: 0 0 8px 24px; }
    .hero-rule { border-top: 1px solid var(--ink); display: block; margin: 34px 0 18px; width: 42px; }
    .hero-count { color: var(--ink); font-family: var(--mono); font-size: 1.15rem; line-height: 1.1; }
    .hero-count small { color: var(--muted); font-size: .6rem; letter-spacing: .04em; }
    .hero-stamp { border: 1px solid var(--signal); color: var(--signal); font-family: var(--mono); font-size: .72rem; line-height: 1.1; padding: 8px; position: absolute; right: 14%; text-align: center; top: 21%; transform: rotate(9deg); }
    .hero-stamp span { color: var(--ink); font-size: .55rem; }
    .catalog { border-top: 1px solid var(--line); margin: 0 auto; max-width: 1320px; padding: 58px 36px 20px; }
    .section-heading { align-items: end; display: flex; justify-content: space-between; margin-bottom: 38px; }
    h2 { font-family: var(--serif); font-size: clamp(3rem, 6vw, 5.6rem); font-weight: 400; letter-spacing: -.055em; line-height: .85; }
    .section-intro { color: var(--muted); font-size: .82rem; line-height: 1.55; max-width: 240px; }
    .filters { border-bottom: 1px solid var(--line); display: flex; gap: 8px; margin-bottom: 28px; overflow-x: auto; padding-bottom: 13px; }
    .filters button { background: transparent; border: 0; color: var(--muted); cursor: pointer; padding: 5px 12px; white-space: nowrap; }
    .filters button:first-child { padding-left: 0; }
    .filters button.active, .filters button:hover { color: var(--signal); }
    .app-grid { display: grid; gap: 12px; grid-template-columns: repeat(3, 1fr); }
    .app-card { background: var(--card); color: var(--ink); display: flex; flex-direction: column; min-height: 305px; padding: 16px; position: relative; text-decoration: none; transition: background .25s ease, transform .25s ease; }
    .app-card::before { background: var(--accent); content: ''; height: 3px; left: 0; position: absolute; right: 0; top: 0; }
    .app-card:hover { background: var(--ink); color: var(--paper); transform: translateY(-5px); }
    .card-top, .card-bottom { display: flex; justify-content: space-between; }
    .card-number { color: var(--muted); }.card-category { color: var(--accent); }
    .app-icon { background: var(--accent); display: flex; height: 74px; justify-content: center; margin: auto 0 24px; overflow: hidden; width: 74px; }
    .app-icon img { display: block; height: 100%; object-fit: cover; width: 100%; }
    .card-bottom { align-items: end; gap: 12px; }.card-bottom h3 { font-family: var(--serif); font-size: 2rem; font-weight: 400; letter-spacing: -.04em; line-height: 1; }.card-bottom p { color: var(--muted); font-size: .75rem; line-height: 1.4; margin-top: 7px; max-width: 190px; }.app-card:hover .card-bottom p { color: #b8b4ad; }.card-arrow { color: var(--accent); font-size: 1.35rem; }
    @media (max-width: 760px) { .hero { padding: 24px 20px 70px; }.hero-grid { display: block; margin-top: 110px; }.hero-note { margin: 48px 0 0 8px; }.hero-stamp { right: 10%; top: 25%; }.catalog { padding: 44px 20px 10px; }.section-heading { align-items: flex-start; flex-direction: column; gap: 22px; }.app-grid { grid-template-columns: repeat(2, 1fr); }.app-card { min-height: 260px; }.card-bottom h3 { font-size: 1.65rem; } }
    @media (max-width: 450px) { .hero-kicker span:nth-child(2) { display: none; }.app-grid { grid-template-columns: 1fr; }.app-card { min-height: 230px; } }
  `]
})
export class HomeComponent {
  readonly apps = APPS;
  readonly categories = CATEGORIES;
  readonly selectedCategory = signal<(typeof CATEGORIES)[number]>('All');
  readonly filteredApps = computed(() => this.selectedCategory() === 'All' ? APPS : APPS.filter(app => app.category === this.selectedCategory()));

  selectCategory(category: (typeof CATEGORIES)[number]): void { this.selectedCategory.set(category); }
}