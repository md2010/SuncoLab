import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { CarouselItemPreview } from '../../models/carouselItem';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GalleryService } from '../../services/gallery/gallery.service';

@Component({
  selector: 'app-carousel',
  standalone: false,
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit {
    @Input() slides: CarouselItemPreview[] | undefined;
    @Input() albumId?: string;

    customOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      navSpeed: 700,
      navText: [
        '<span class="nav-arrow nav-prev">&#10094;</span>',  // ‹
        '<span class="nav-arrow nav-next">&#10095;</span>'   // ›
      ],
      nav: true,
      items: 1
    };

    constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: {albumId?: string}, private galleryService: GalleryService) {
      if (this.data?.albumId) {
        this.albumId = this.data.albumId;
      }
    }

    ngOnInit(): void {
      if (this.albumId) {
        this.getImages();
      }
    }

    getImages() {
      this.galleryService.getImagesForAlbum(this.albumId!)
      .subscribe(response => {
        let images = response;
        this.slides = new Array<CarouselItemPreview>()
        images!.forEach(image => {
          this.slides?.push(new CarouselItemPreview(image.id, image.file.path));
        });
      })
    }

}
