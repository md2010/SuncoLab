import { Component, OnInit, ViewChild } from '@angular/core';
import { GalleryService } from '../../services/gallery/gallery.service';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { ToastService } from '../../services/toast/toast.service';
import { Album } from '../../models/album';
import { FileUploadComponent } from '../file-upload/file-upload.component';

@Component({
  selector: 'app-image-upload',
  standalone: false,
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent implements OnInit {
    @ViewChild(FileUploadComponent) fileUploader!: FileUploadComponent;
    
    selectedAlbum: string | null = null;
    albums: Array<Album> = [];
    formData?: FormData;
    files: Array<File> = [];

    constructor(private galleryService: GalleryService, private spinner: SpinnerService, private toast: ToastService) {}

    ngOnInit() {
      this.getAlbums();
    }         

    getAlbums() {
      this.galleryService.getAllAlbums()
      .subscribe(response => {
        if (response) {
          this.albums = response;
        }
      })
    }

    onFilesChanged(files: File[]) {
      this.files = files;
    }

    saveFiles() {
      this.spinner.show(); 

      this.formData = this.fileUploader.getFormData();   
      this.formData.append('albumId', this.selectedAlbum!);

      this.galleryService.saveFiles(this.formData)
      .subscribe(response => {
        if (response) {
          this.reset();
          this.resetFileUploader();
          this.toast.create('File(s) uploaded successfully.');
        }
        else {
          this.toast.create('Error happend while uploading file(s).', 'error');
        }
      })
    }

    resetFileUploader() {
      this.fileUploader.reset();
    }

    reset() {
      this.formData = new FormData();
      this.files = new Array<File>();
      this.selectedAlbum = null;
    }
}
