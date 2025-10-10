import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
import { HomeService } from '../../services/home/home.service';
import { MosaicItem } from '../../models/mosaicItem';

@Component({
  selector: 'app-mosaic',
  standalone: false,
  templateUrl: './mosaic.component.html',
  styleUrl: './mosaic.component.css'
})
export class MosaicComponent implements OnInit {
  items: MosaicItem[] = [];
  chunks = 1;

  constructor(private homeService: HomeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this.homeService.getMosaic()
      .subscribe(items => {
        this.items = items ?? [];
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

  openBlog(id: string) {
    const url = `${window.location.origin}/blog-preview/${id}`;
    window.open(url, "_self");
  }
}
