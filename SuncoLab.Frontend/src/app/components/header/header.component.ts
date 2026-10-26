import { Component, DestroyRef, HostListener, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { Authorized } from '../../models/authorization';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  authorized: Authorized | undefined;
  menuOpen = false;
  menuVisible = false;
  readonly links: { path: string; label: string; exact?: boolean }[] = [
    { path: '/', label: 'Home', exact: true },
    { path: '/blog', label: 'Blog' },
    { path: '/gallery', label: 'Galerija' },
    { path: '/about', label: 'O nama' },
    { path: '/contact', label: 'Kontakt' },
  ];

  /** Desktop: nakon skrolanja header prelazi u jedan red (logo lijevo, nav desno) */
  compact = false;

  /** Sadržaj je ispod headera - header dobiva mekanu sjenu */
  scrolled = false;

  /** Mobitel: header se skriva pri skrolanju prema dolje, vraća pri skrolanju gore */
  hidden = false;

  private lastScrollTop = 0;
  private readonly compactThreshold = 80;
  private readonly hideThreshold = 200;

  constructor(private authService: AuthService, private router: Router, private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    this.authService.authorizedSubject
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(user => {
        this.authorized = user?.isAuth ? user : undefined;
      });

    this.router.events
      .pipe(filter(e => e instanceof NavigationStart), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.closeMenu());
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollTop = window.scrollY;
    const desktop = window.innerWidth >= 1024;

    this.compact = desktop && scrollTop > this.compactThreshold;
    this.scrolled = scrollTop > 4;

    if (desktop) {
      this.hidden = false;
    } else if (Math.abs(scrollTop - this.lastScrollTop) > 8) {
      this.hidden = scrollTop > this.lastScrollTop && scrollTop > this.hideThreshold;
    }

    this.lastScrollTop = scrollTop;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  logout(): void {
    this.closeMenu();
    this.authService.logout();
  }

  toggleMenu(): void {
    this.menuOpen ? this.closeMenu() : this.openMenu();
  }

  private openMenu(): void {
    this.menuVisible = true;
    setTimeout(() => this.menuOpen = true, 10);
    document.body.style.overflow = 'hidden';
  }

  closeMenu(): void {
    if (!this.menuOpen) {
      return;
    }

    this.menuOpen = false;
    setTimeout(() => {
      this.menuVisible = false;
      document.body.style.overflow = '';
    }, 300);
  }
}
