import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-preview',
  standalone: false,
  templateUrl: './image-preview.component.html',
  styleUrl: './image-preview.component.css'
})
export class ImagePreviewComponent {
  path: string = "";

  @ViewChild('previewImage') imageElement!: ElementRef<HTMLImageElement>;

   constructor(public dialogRef: MatDialogRef<ImagePreviewComponent>, @Inject(MAT_DIALOG_DATA) public data: { path: string; })
   { 
      this.path = data.path; 
   }

   onImageLoad() {
    const img = this.imageElement.nativeElement;
    const width = img.naturalWidth;
    const height = img.naturalHeight;

    this.dialogRef.updateSize(`${width}px`, `${height}px`);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
