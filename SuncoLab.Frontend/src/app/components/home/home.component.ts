import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../../services/home/home.service';
import { CarouselItem } from '../../models/carouselItem';
import { BlogService } from '../../services/blog/blog.service';

interface Sticker {
  src: string;
  /** Kut naljepnice; na hover se upola izravna */
  rotate: string;
  link: string | string[];
  /** Naslov članka za čitače ekrana (naljepnica nema vidljiv tekst) */
  label: string;
  /** Najnoviji članak dobiva pečat "NOVO" */
  isNew?: boolean;
}

// TODO: zamijeniti podacima iz admina (naljepnica + članak po mjestu)
const PLACEHOLDER = '/images/5808746369af4f1354143ac4f2aa29ea.jpg';
const placeholder = (rotate: string, i: number): Sticker => ({ src: PLACEHOLDER, rotate, link: '/blog', label: 'Članak', isNew: i === 0 });

/** Razmak između naljepnica koje se "lijepe" u istom trenutku */
const STICK_STAGGER_MS = 110;

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  carouselItems: CarouselItem[] | undefined;

  bigStickers: Sticker[] = ['20deg', '-5deg', '-20deg'].map(placeholder);
  smallStickers: Sticker[] = ['10deg', '-15deg', '20deg', '-20deg'].map((r, i) => placeholder(r, i + 3));

  /** Dateline kao na naslovnici novina, npr. "ponedjeljak, 12. listopada 2026." */
  readonly today = new Intl.DateTimeFormat('hr-HR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

  /** "Broj izdanja" = broj objavljenih članaka */
  issueNumber?: number;

  @ViewChild('stickers') stickersRef?: ElementRef<HTMLElement>;
  @ViewChild('papers') papersRef?: ElementRef<HTMLElement>;
  private stickObserver?: IntersectionObserver;
  private paperObserver?: IntersectionObserver;
  private paperResizeObserver?: ResizeObserver;

  constructor(private homeService: HomeService, private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getAll().subscribe(blogs => {
      this.issueNumber = blogs?.length || undefined;
    });

    this.homeService.getCarousel()
    .subscribe({
      next: (result) => {
        this.carouselItems = result;
      }
    })
  }

  ngAfterViewInit(): void {
    this.trackPaperHeights();
    this.animateStickers();
    this.revealPapers();
  }

  ngOnDestroy(): void {
    this.stickObserver?.disconnect();
    this.paperObserver?.disconnect();
    this.paperResizeObserver?.disconnect();
  }

  /**
   * Poderani rub (.paper__tear) mora nastaviti teksturu svoje sekcije - za to treba znati visinu sekcije.
   * Visina se mijenja s učitavanjem slika i promjenom širine, pa je prati ResizeObserver.
   */
  private trackPaperHeights(): void {
    const papers = this.papersRef?.nativeElement.querySelectorAll<HTMLElement>('.paper');

    if (!papers?.length || !('ResizeObserver' in window)) {
      return;
    }

    this.paperResizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const paper = entry.target as HTMLElement;
        paper.style.setProperty('--paper-h', `${paper.offsetHeight}px`);
      });
    });

    papers.forEach(paper => this.paperResizeObserver!.observe(paper));
  }

  private get canAnimate(): boolean {
    return !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window;
  }

  /**
   * Sekcije ispod prve "ispadnu" ispod gornjeg papira kad im vrh uđe u ekran (CSS: .paper--reveal).
   * Prva sekcija je odmah vidljiva.
   */
  private revealPapers(): void {
    const container = this.papersRef?.nativeElement;

    if (!container || !this.canAnimate) {
      return;
    }

    container.classList.add('papers--animate');

    this.paperObserver = new IntersectionObserver(entries => {
      entries
        .filter(entry => entry.isIntersecting)
        .forEach(entry => {
          entry.target.classList.add('is-revealed');
          this.paperObserver?.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -15% 0px' });

    container.querySelectorAll('.paper--reveal').forEach(paper => this.paperObserver!.observe(paper));
  }

  /**
   * Naljepnice se "zalijepe" (padnu s malim odskokom) kad uđu u ekran.
   * Skrivaju se tek kad JS doda stickers--animate, pa bez JS-a / uz reduced motion ostaju vidljive.
   */
  private animateStickers(): void {
    const container = this.stickersRef?.nativeElement;

    if (!container || !this.canAnimate) {
      return;
    }

    container.classList.add('stickers--animate');

    this.stickObserver = new IntersectionObserver(entries => {
      entries
        .filter(entry => entry.isIntersecting)
        .forEach((entry, i) => {
          const sticker = entry.target as HTMLElement;
          sticker.style.setProperty('--delay', `${i * STICK_STAGGER_MS}ms`);
          sticker.classList.add('sticker--in');
          this.stickObserver?.unobserve(sticker);
        });
    }, { threshold: 0.25 });

    container.querySelectorAll('.sticker').forEach(sticker => this.stickObserver!.observe(sticker));
  }
}
