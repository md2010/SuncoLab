import { Component, inject, OnInit } from '@angular/core';
import { Image } from '../../models/image';
import { MatDialog } from '@angular/material/dialog';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
import { BlogService } from '../../services/blog/blog.service';

@Component({
  selector: 'app-mosaic',
  standalone: false,
  templateUrl: './mosaic.component.html',
  styleUrl: './mosaic.component.css'
})
export class MosaicComponent implements OnInit {
  images: Image[] = [];
  chunks: number = 1;

  constructor(private blogService: BlogService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this.blogService.getAll()
    .subscribe(result => {
      result!.forEach(blog => {
        this.images.push(blog.coverImage!);
      });
    })
  }

  openImage(imagePath: string) {
    this.dialog.open(ImagePreviewComponent, {
        height: '700px',
        width: '1000px',
        data: { 
          path: imagePath
        }
      });
  }
}
