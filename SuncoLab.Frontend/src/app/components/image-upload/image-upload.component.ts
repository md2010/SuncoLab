import { Component, OnInit, ViewChild } from '@angular/core';
import { GalleryService } from '../../services/gallery/gallery.service';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { ToastService } from '../../services/toast/toast.service';
import { Album } from '../../models/album';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { BlogService } from '../../services/blog/blog.service';
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-image-upload',
  standalone: false,
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent implements OnInit {
    @ViewChild(FileUploadComponent) fileUploader!: FileUploadComponent;
    
    selectedAlbum: string | null = null;
    selectedBlog: string | null = null;
    
    albums: Array<Album> = [];
    blogs: Array<Blog> = [];

    formData?: FormData;
    files: Array<File> = [];

    constructor(private galleryService: GalleryService, private spinner: SpinnerService, private toast: ToastService, private blogService: BlogService) {}

    ngOnInit() {
      this.spinner.show();
      this.getAlbums();
      this.getBlogs();
      this.spinner.hide();
    }         

    getAlbums() {
      this.galleryService.getAllAlbums(true)
      .subscribe(response => {
        if (response) {
          this.albums = response;
        }
      })
    }

    getBlogs() {
      this.blogService.getAll()
      .subscribe(response => {
        if (response) {
          this.blogs = response;
        }
      })
    }

    onFilesChanged(files: File[]) {
      this.files = files;
    }

    saveFiles() {
      this.spinner.show(); 

      this.formData = this.fileUploader.getFormData();   

      if (this.selectedAlbum) {
        if (!this.formData.get('albumId')) {
          this.formData.append('albumId', this.selectedAlbum!);
        }
        else {
         this.formData.set('albumId', this.selectedAlbum); 
        }
      }
      else {
         this.formData.delete('albumId');
      }

      if (this.selectedBlog) {
        if (!this.formData.get('blogId')) {
          this.formData.append('blogId', this.selectedBlog!);
        }
        else {
          this.formData.set('blogId', this.selectedBlog); 
        }
      }
      else {
        this.formData.delete('blogId');
      }

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
        this.spinner.hide();
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
