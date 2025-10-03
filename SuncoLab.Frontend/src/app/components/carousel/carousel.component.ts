import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { CarouselItem } from '../../models/carouselItem';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GalleryService } from '../../services/gallery/gallery.service';

@Component({
  selector: 'app-carousel',
  standalone: false,
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit {
    @Input() slides: CarouselItem[] | undefined;
    @Input() albumId?: string;

    customOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      navSpeed: 700,
      navText: ['Previous', 'Next'],
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
      else if (this.slides == undefined) { 
        this.slides = new Array<CarouselItem>(3)         
        this.slides[0] = {
          id: "1",
          path: 'https://suncolabstorage.blob.core.windows.net/images/Magic Forest/forest.jpg'
        };
        this.slides[1] = {
          id: "2",
          path: 'https://suncolabstorage.blob.core.windows.net/images/black-sand.jpg'
        };
        this.slides[2] = {
          id: "3",
          path: 'https://suncolabstorage.blob.core.windows.net/images/black-sand.jpg'
        };
      }
    }

    getImages() {
      this.galleryService.getImagesForAlbum(this.albumId!)
      .subscribe(response => {
        let images = response;
        this.slides = new Array<CarouselItem>()
        images!.forEach(image => {
          this.slides?.push(new CarouselItem(image.id, image.file.path));
        });
      })
    }

}
