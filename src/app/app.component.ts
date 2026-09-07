import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { APPS } from './app-data';

@Component({
  selector: 'gallery-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <header class="site-header">
      <a class="wordmark" routerLink="/" aria-label="Field Notes home">
        <span class="wordmark-mark">FN</span>
        <span>Field Notes</span>
      </a>
      <nav aria-label="Primary navigation">
        <a routerLink="/" fragment="catalog">Catalog <span class="nav-arrow">↘</span></a>
        <a class="social-link" href="https://www.tiktok.com/@codecraftsbr7" target="_blank" rel="noreferrer">TikTok <span class="nav-arrow">↗</span></a>
      </nav>
      <span class="header-index">{{ appCount }} apps / 2026</span>
    </header>
    <main><router-outlet /></main>
    <footer class="site-footer">
      <span>Field Notes / Independent app studio</span>
      <span>Built for the curious <span class="footer-dot">●</span></span>
    </footer>
  `,
  styles: [`
    :host { display: block; min-height: 100vh; }
    .site-header, .site-footer { align-items: center; display: flex; justify-content: space-between; margin: 0 auto; max-width: 1320px; padding: 24px 36px; }
    .site-header { border-bottom: 1px solid var(--line); }
    .wordmark { align-items: center; color: var(--ink); display: inline-flex; font-family: var(--sans); font-size: .82rem; font-weight: 700; gap: 10px; letter-spacing: .08em; text-decoration: none; text-transform: uppercase; }
    .wordmark-mark { align-items: center; background: var(--ink); color: var(--paper); display: inline-flex; font-family: var(--mono); font-size: .62rem; height: 27px; justify-content: center; letter-spacing: 0; width: 27px; }
    nav a { color: var(--muted); font-family: var(--mono); font-size: .68rem; letter-spacing: .1em; text-decoration: none; text-transform: uppercase; }
    nav { display: flex; gap: 22px; }
    nav a:hover { color: var(--signal); }
    .social-link { color: var(--signal); }
    .nav-arrow { color: var(--signal); font-size: 1rem; margin-left: 4px; }
    .header-index, .site-footer { color: var(--muted); font-family: var(--mono); font-size: .63rem; letter-spacing: .08em; text-transform: uppercase; }
    .site-footer { border-top: 1px solid var(--line); margin-top: 80px; }
    .footer-dot { color: var(--signal); font-size: .5rem; margin-left: 8px; vertical-align: 2px; }
    @media (max-width: 620px) { .site-header, .site-footer { padding: 20px; } .header-index { display: none; } .site-footer { align-items: flex-start; flex-direction: column; gap: 8px; margin-top: 48px; } }
  `]
})
export class AppComponent {
  readonly appCount = APPS.length;
}