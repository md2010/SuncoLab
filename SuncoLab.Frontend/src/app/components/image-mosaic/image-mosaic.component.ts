import { Component, inject, OnInit } from '@angular/core';
import { Image } from '../../models/image';
import { GalleryService } from '../../services/gallery/gallery.service';
import { MatDialog } from '@angular/material/dialog';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';

@Component({
  selector: 'app-image-mosaic',
  standalone: false,
  templateUrl: './image-mosaic.component.html',
  styleUrl: './image-mosaic.component.css'
})
export class ImageMosaicComponent implements OnInit {
  images: Image[] = [];
  chunks: number = 1;
  readonly dialog = inject(MatDialog);

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.getImages();
  }

  getImages() {
    this.galleryService.getImagesForMosaic()
    .subscribe(response => {
      this.images = response!;
      this.chunks = Math.ceil(this.images.length/6);
    })
  }

  openImage(imagePath: string) {
    let dialogRef = this.dialog.open(ImagePreviewComponent, {
        height: '700px',
        width: '1000px',
        data: { 
          path: imagePath
        }
      });
    }
}
