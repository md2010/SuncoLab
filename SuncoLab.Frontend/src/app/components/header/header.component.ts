import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Authorized } from '../../models/authorization';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, AfterViewInit {
  authorized: Authorized | undefined;
  menuOpen = false;
  menuVisible = false;
  headerHeight = 0;
  mainPaddingTop = 0;
  headerScrolled = false;
  lastScrollTop = 0;
  scrollThreshold = 100; // Pixels to scroll before shrinking

  @ViewChild('header', { static: false }) headerElement!: ElementRef;
  
  constructor(private authService: AuthService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.authService.authorizedSubject.subscribe(user => {
      if (user && user.isAuth) {
        this.authorized = user;
      }
      else {
        this.authorized = undefined;
      }
      this.cd.detectChanges();
      
      // Recalculate after auth state changes (in case it affects header height)
      setTimeout(() => {
        this.calculateHeaderHeight();
      }, 100);
    });
  }

  ngAfterViewInit(): void {
    // Multiple calculations to ensure it catches the final rendered height
    setTimeout(() => {
      this.calculateHeaderHeight();
    }, 0);
    
    setTimeout(() => {
      this.calculateHeaderHeight();
    }, 100);
    
    setTimeout(() => {
      this.calculateHeaderHeight();
    }, 300);
    
    window.addEventListener('resize', () => {
      this.calculateHeaderHeight();
    });
    
    // Also listen for window load event
    window.addEventListener('load', () => {
      this.calculateHeaderHeight();
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only shrink on desktop (lg breakpoint and above)
    if (window.innerWidth >= 1024) {
      if (scrollTop > this.scrollThreshold) {
        // Scrolled down - shrink header
        this.headerScrolled = true;
      } else {
        // At top - show full header
        this.headerScrolled = false;
      }
    } else {
      // Always show full header on mobile
      this.headerScrolled = false;
    }
    
    this.lastScrollTop = scrollTop;
  }

  calculateHeaderHeight(): void {
    if (this.headerElement) {
      const height = this.headerElement.nativeElement.offsetHeight;
      this.headerHeight = height + 40; // For mobile overlay
      this.mainPaddingTop = height + 80; // For main element
      
      // Apply padding to main element
      const mainElement = document.querySelector('main');
      if (mainElement) {
        (mainElement as HTMLElement).style.paddingTop = `${this.mainPaddingTop}px`;
      }
      
      this.cd.detectChanges();
    }
  }

  logout(): void {
    this.authService.logout();
  }

  toggleMenu(): void {
    if (!this.menuOpen) {
      // Opening
      this.menuVisible = true;
      setTimeout(() => {
        this.menuOpen = true;
        this.calculateHeaderHeight();
      }, 10);
      document.body.style.overflow = 'hidden';
    } else {
      // Closing
      this.menuOpen = false;
      setTimeout(() => {
        this.menuVisible = false;
        document.body.style.overflow = '';
      }, 300);
    }
  }
}