import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../services/gallery/gallery.service';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { Album, AlbumFilter } from '../../models/album';
import { ImageListComponent } from '../image-list/image-list.component';
import { MatDialog } from '@angular/material/dialog';
import { Image } from '../../models/image';
import { HomeService } from '../../services/home/home.service';
import { ToastService } from '../../services/toast/toast.service';
import { AddCarouselItem, EditCarouselItem } from '../../models/carouselItem';

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
  itemsToEdit: Array<EditCarouselItem> = [];
  showError = false;

  constructor(
    private galleryService: GalleryService, 
    private spinner: SpinnerService, 
    private homeService: HomeService,
    private toast: ToastService,
    private dialog: MatDialog) {};

  ngOnInit(): void {
    this.spinner.show();
    this.getAlbums(); 
    this.getCarousel();
    this.spinner.hide();
  }

  getCarousel() {
    this.homeService.getCarousel()
    .subscribe({
      next: (result) => {
        result?.forEach(element => {
          this.selectedImages.push(new AddCarouselItem(element.imageId, element.path, element.sortOrder))
        });
      }
    })
  }

  getAlbums() {
      this.galleryService.findAlbums(new AlbumFilter(false))
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
      if (!this.selectedImages.find(item => { item.imageId == image.id})) {
          this.selectedImages.push({
          imageId: image.id,
          path: image.file.path,
          sortOrder: undefined
        });
      }
    })
  }

  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
  }

  saveCarouselItems() {
    if (this.selectedImages.some(i => i.imageId == undefined || i.sortOrder == undefined)) {
      this.showError = true;
      return;
    }

    this.showError = false;

    this.selectedImages.forEach(element => {
      this.itemsToEdit.push(new EditCarouselItem(element.sortOrder, element.imageId));
    });

    this.homeService.editCarousel({"items": this.itemsToEdit})
    .subscribe({ 
      next: () => { 
        this.toast.create('Carousel saved.');
        this.itemsToEdit = [];
        setTimeout(() => {
           window.location.reload() 
        8000});
      },
      error: () => {
        this.toast.create('Error happend while saving carousel.', 'error');
      }
    })
  }
    
}


