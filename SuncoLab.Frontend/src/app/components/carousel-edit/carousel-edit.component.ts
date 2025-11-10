import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../services/gallery/gallery.service';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { Album } from '../../models/album';
import { ImageListComponent } from '../image-list/image-list.component';
import { MatDialog } from '@angular/material/dialog';
import { Image } from '../../models/image';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-carousel-edit',
  standalone: false,
  templateUrl: './carousel-edit.component.html',
  styleUrl: './carousel-edit.component.css'
})
export class CarouselEditComponent implements OnInit {
  selectedAlbum : string | undefined;
  albums : Array<Album> = [];
  selectedImages: Array<AddCarouselItem> = [];

  constructor(
    private galleryService: GalleryService, 
    private spinner: SpinnerService, 
    private dialog: MatDialog) {};

  ngOnInit(): void {
    this.spinner.show();
    this.getAlbums(); 
    this.spinner.hide();
  }

  //get existing carousel items

  getAlbums() {
      this.galleryService.getAllAlbums(true)
      .subscribe(response => {
        if (response) {
          this.albums = response;
        }
      })
    }

  onAlbumChanged(value: string) {
    this.selectedAlbum = value;
    const dialogRef = this.dialog.open(ImageListComponent, {
      height: '600px',
      width: '1300px',
      data: { 
        albumId: this.selectedAlbum,
        mosaicEdit: true
      }
    });

    dialogRef.componentInstance.imageForMosaicSelected
    .subscribe((image: Image) => {
      if (!this.selectedImages.find(item => { item.image.id == image.id})) {
          this.selectedImages.push({
          image: image,
          sortOrder: this.selectedImages.length + 1
        });
      }
    })
  }

  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
  }

  saveCarouselItems() {

  }
    
}

export interface AddCarouselItem {
  image: Image;
  sortOrder: number;
}
