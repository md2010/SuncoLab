import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Image } from '../../models/image';
import { GalleryService } from '../../services/gallery/gallery.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogActions } from '@angular/material/dialog';
import { ToastService } from '../../services/toast/toast.service';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
import { MatButtonModule } from '@angular/material/button';

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
  @Input() mosaicEdit: boolean = false;
  @Input() width: number = 600;
  @Input() height: number = 400;

  @Output() imageForMosaicSelected = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {albumId?: string, height?: number, width?: number, edit? : boolean, mosaicEdit?: boolean}, 
    private galleryService: GalleryService,
    private toast: ToastService,
    private dialog: MatDialog) {

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
    if (data.mosaicEdit) {
      this.mosaicEdit = data.mosaicEdit;
    }
  }

  getImages() {
    this.galleryService.getImagesForAlbum(this.albumId!)
    .subscribe(response => {
      this.images = response;
    })
  }

  openImage(imagePath: string) {
      this.dialog.open(ImagePreviewComponent, {
          height: '700px',
          width: '700px',
          data: { 
            path: imagePath
        }
      });
    }

  deleteFile(fileId: string) {
    this.galleryService.deleteImage(fileId)
    .subscribe(result => {
      if (result) {
        this.toast.create('Image deleted succesfully. Image may be connected to carousel item.')
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

  onImageForMosaicSelected(image: Image) {
    this.imageForMosaicSelected.emit(image);
  }

}
