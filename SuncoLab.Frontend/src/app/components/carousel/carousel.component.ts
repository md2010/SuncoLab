import { Component, Inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarouselComponent as OwlCarousel, OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { CarouselItemPreview } from '../../models/carouselItem';
import { GalleryService } from '../../services/gallery/gallery.service';

const NONE: readonly number[] = [];
const ONE: readonly number[] = [0];
const TWO: readonly number[] = [0, 1];

@Component({
  selector: 'app-carousel',
  standalone: false,
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit {
  @Input() slides: CarouselItemPreview[] | undefined;
  @Input() albumId?: string;
  @Input() title = 'Naslov Galerije';

  @ViewChild('owl') owl?: OwlCarousel;

  activeIndex = 0;

  /** Owl širinu mjeri samo jednom (u ngOnInit), pa ga renderiramo tek kad popup ima konačnu veličinu */
  ready = false;

  /** Izvan dialoga (homepage) - bez papira i naslova */
  embedded = false;

  customOptions: OwlOptions = {
    loop: true,
    items: 1,
    margin: 0,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    navSpeed: 700,
    dots: false,
    nav: false,
    // bez 'responsive' Owl uopće ne sluša window resize (rotacija ekrana, promjena veličine prozora)
    responsive: {
      0: { items: 1 }
    }
  };

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { albumId?: string; title?: string },
    @Optional() private dialogRef: MatDialogRef<CarouselComponent>,
    private galleryService: GalleryService
  ) {
    if (this.data?.albumId) {
      this.albumId = this.data.albumId;
    }
    if (this.data?.title) {
      this.title = this.data.title;
    }
  }

  ngOnInit(): void {
    if (this.dialogRef) {
      this.dialogRef.afterOpened().subscribe(() => this.ready = true);
    } else {
      this.ready = true;
      this.embedded = true;
    }

    if (this.albumId) {
      this.getImages();
    }
  }

  getImages() {
    this.galleryService.getImagesForAlbum(this.albumId!)
      .subscribe(response => {
        this.slides = new Array<CarouselItemPreview>();
        response!.forEach(image => {
          this.slides?.push(new CarouselItemPreview(image.id, image.file.path));
        });
      });
  }

  /** Uvijek se prikazuju barem dvije točkice */
  get placeholderDots(): readonly number[] {
    const missing = 2 - (this.slides?.length ?? 0);
    return missing >= 2 ? TWO : missing === 1 ? ONE : NONE;
  }

  onChange(e: SlidesOutputData) {
    if (e.startPosition !== undefined) {
      this.activeIndex = e.startPosition;
    }
  }
}
