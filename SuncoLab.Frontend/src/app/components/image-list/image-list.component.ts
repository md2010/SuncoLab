import { Component, Inject, Input } from '@angular/core';
import { Image } from '../../models/image';
import { GalleryService } from '../../services/gallery/gallery.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-image-list',
  standalone: false,
  templateUrl: './image-list.component.html',
  styleUrl: './image-list.component.css'
})
export class ImageListComponent {
  @Input() images?: Image[];
  @Input() albumId?: string;
  @Input() edit: boolean = false;
  @Input() width: number = 600;
  @Input() height: number = 400;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {albumId?: string, height?: number, width?: number, edit? : boolean}, 
    private galleryService: GalleryService,
    private toast: ToastService) {

    if (!this.images && data.albumId !== null) {
      this.albumId = data.albumId;
      this.getImages();
    }

    if (data.height) {
      this.height = data.height;
    }
    if (data.width) {
      this.width = data.width;
    }
    if (data.edit) {
      this.edit = data.edit;
    }
  }

  getImages() {
    this.galleryService.getImagesForAlbum(this.albumId!)
    .subscribe(response => {
      this.images = response;
    })
  }

  deleteFile(fileId: string) {
    this.galleryService.deleteImage(fileId)
    .subscribe(result => {
      if (result) {
        this.toast.create('Image deleted succesfully.')
        setTimeout(() => {
           window.location.reload() 
        8000}); 
      }
    })
  }

  setCoverImage(albumId: string, imageId: string) {
    this.galleryService.setCoverImage(albumId, imageId)
    .subscribe(result => {
      if (result) {
        this.toast.create('Image set as cover image.')
        setTimeout(() => {
           window.location.reload() 
        8000});       
      }
    })
  }

  showOnHomePage(image: Image) {
    this.galleryService.showOnHomePage(image.id, !image.showInMosaic)
    .subscribe(result => {
      if (result) {
        this.toast.create('You have successfuly changed visibility of this image on home page.') 
        setTimeout(() => {
           window.location.reload() 
        8000});      
      }
    })
  }

}
