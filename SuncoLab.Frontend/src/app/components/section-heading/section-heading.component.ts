import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Zaglavlje rubrike u novinskom stilu: mali nadnaslov ("RUBRIKA 01"), naslov lijevo, link "vidi sve" desno,
 * ispod dvostruka crvena linija od ruba do ruba ekrana.
 * Na mobitelu se link iz zaglavlja skriva - stranica ga prikazuje kao gumb na kraju sekcije (.section-more).
 * Boje se mogu promijeniti varijablama (npr. na tamnom papiru): --heading-color (naslov),
 * --heading-accent (linije), --heading-text-accent (nadnaslov i link; zadano = --heading-accent).
 */
@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="heading">
      <div>
        @if (kicker) {
          <p class="heading__kicker">{{ kicker }}</p>
        }
        <h2 class="heading__title">{{ title }}</h2>
      </div>
      @if (link && linkText) {
        <a class="heading__link" [routerLink]="link">{{ linkText }}</a>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    /*
      Dvostruka linija kao ispod rubrike u novinama (debela + tanka), od ruba do ruba ekrana kao linije u headeru.
      Full-bleed trik: box-shadow produži liniju, clip-path je reže samo okomito - ne stvara vodoravni scroll.
    */
    .heading {
      position: relative;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 16px;
      padding-bottom: 13px;
    }

    .heading::before,
    .heading::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      background: var(--heading-accent, var(--color-primary));
      box-shadow: 0 0 0 100vmax var(--heading-accent, var(--color-primary));
      clip-path: inset(0 -100vmax);
    }

    .heading::before {
      bottom: 0;
      height: 3px;
    }

    .heading::after {
      bottom: -6px;
      height: 1px;
    }

    .heading__kicker {
      margin: 0 0 4px;
      font-family: 'Oswald', sans-serif;
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--heading-text-accent, var(--heading-accent, var(--color-primary)));
    }

    .heading__title {
      margin: 0;
      color: var(--heading-color, var(--color-dark));
      line-height: 1.1;
    }

    .heading__link {
      display: none;
      flex-shrink: 0;
      padding-bottom: 6px;
      font-family: 'Oswald', sans-serif;
      font-weight: 600;
      font-size: 16px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--heading-text-accent, var(--heading-accent, var(--color-primary)));
      transition: color 0.2s;
    }

    .heading__link:hover,
    .heading__link:focus-visible {
      color: var(--heading-color, var(--color-dark));
    }

    @media (min-width: 640px) {
      .heading__link {
        display: inline;
      }
    }
  `
})
export class SectionHeadingComponent {
  @Input({ required: true }) title!: string;
  @Input() kicker?: string;
  @Input() linkText?: string;
  @Input() link?: string;
}
