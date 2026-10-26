import { Component, Input } from '@angular/core';

/**
 * Zaglavlje podstranice u novinskom stilu: mali nadnaslov, veliki naslov (h1), uvodna rečenica
 * i dvostruka crvena linija od ruba do ruba ekrana (isti potpis kao rubrike na naslovnici).
 * Dodatni sadržaj (npr. tražilica) može se ubaciti između uvoda i linije kroz <ng-content>.
 */
@Component({
  selector: 'app-page-masthead',
  standalone: true,
  template: `
    <header class="masthead">
      @if (kicker) {
        <p class="masthead__kicker">{{ kicker }}</p>
      }
      <h1 class="masthead__title">{{ title }}</h1>
      @if (lead) {
        <p class="masthead__lead">{{ lead }}</p>
      }
      <ng-content></ng-content>
    </header>
  `,
  styles: `
    :host {
      display: block;
    }

    .masthead {
      position: relative;
      max-width: 1200px;
      margin: 0 auto 48px;
      padding: 0 20px 28px;
    }

    .masthead::before,
    .masthead::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      background: var(--color-primary);
      box-shadow: 0 0 0 100vmax var(--color-primary);
      clip-path: inset(0 -100vmax);
    }

    .masthead::before {
      bottom: 0;
      height: 3px;
    }

    .masthead::after {
      bottom: -6px;
      height: 1px;
    }

    .masthead__kicker {
      margin: 0 0 4px;
      font-family: 'Oswald', sans-serif;
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--color-primary);
    }

    .masthead__title {
      margin: 0;
      font-size: clamp(56px, 10vw, 128px) !important;
      line-height: 0.95 !important;
      color: var(--color-dark);
    }

    .masthead__lead {
      max-width: 60ch;
      margin: 16px 0 0;
      font-family: 'Karla', system-ui, sans-serif;
      font-weight: 600;
      font-size: 16px;
      line-height: 1.5;
      color: var(--color-dark);
    }

    @media (min-width: 1024px) {
      .masthead {
        margin-bottom: 72px;
      }

      .masthead__lead {
        font-size: 19px;
      }
    }
  `
})
export class PageMastheadComponent {
  @Input({ required: true }) title!: string;
  @Input() kicker?: string;
  @Input() lead?: string;
}
