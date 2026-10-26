import { Component } from '@angular/core';

interface Pillar {
  title: string;
  text: string;
  link?: string;
  linkText?: string;
}

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  // TODO: tekst od klijenta
  readonly pillars: Pillar[] = [
    {
      title: 'Recenzije',
      text: 'Albumi, singlovi i EP-ovi, domaći i strani - bez PR-a i bez dlake na jeziku.',
      link: '/blog',
      linkText: 'Čitaj recenzije',
    },
    {
      title: 'Intervjui',
      text: 'Razgovori s izvođačima, producentima i ljudima koji rade iza pozornice.',
      link: '/blog',
      linkText: 'Čitaj intervjue',
    },
    {
      title: 'Koncerti',
      text: 'Najave, izvještaji i fotografije iz klubova i s festivala.',
      link: '/gallery',
      linkText: 'Pogledaj galeriju',
    },
  ];
}
