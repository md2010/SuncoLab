import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { GalleryService } from '../../services/gallery/gallery.service';
import { Album, AlbumFilter } from '../../models/album';

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
  /** undefined = još se učitava (prikazuje se skeleton) */
  albums: Album[] | undefined;
  searchName = '';

  /** Pojam za koji su prikazani rezultati (za poruku "Nema albuma za ...") */
  searchedFor = '';

  private search$ = new Subject<string>();

  constructor(private galleryService: GalleryService, private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    // Pretraga dok korisnik tipka, bez slanja zahtjeva za svako slovo
    this.search$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.getAlbums());

    this.getAlbums();
  }

  onSearchInput(value: string): void {
    this.search$.next(value.trim());
  }

  clearSearch(): void {
    this.searchName = '';
    this.search$.next('');
  }

  getAlbums() {
    const name = this.searchName.trim();

    this.galleryService.findAlbums(new AlbumFilter(true, name || undefined))
      .subscribe({
        next: response => {
          this.albums = response ?? [];
          this.searchedFor = name;
        },
        error: () => {
          this.albums = [];
          this.searchedFor = name;
        }
      });
  }
}
