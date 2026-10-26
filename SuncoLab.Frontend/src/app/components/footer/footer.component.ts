import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  readonly links: { path: string; label: string }[] = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'O nama' },
    { path: '/gallery', label: 'Galerija' },
    { path: '/contact', label: 'Kontakt' },
    { path: '/blog', label: 'Blog' },
    { path: '/', label: 'Privacy Policy' }, // TODO: stranica još ne postoji
  ];

  // TODO: upisati prave adrese profila
  readonly socials: { icon: string; label: string; href?: string }[] = [
    { icon: 'email', label: 'Email' },
    { icon: 'youtube', label: 'Youtube' },
    { icon: 'tiktok', label: 'TikTok' },
    { icon: 'instagram', label: 'Instagram' },
  ];
}
