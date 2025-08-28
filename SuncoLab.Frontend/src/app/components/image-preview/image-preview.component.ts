import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-preview',
  standalone: false,
  templateUrl: './image-preview.component.html',
  styleUrl: './image-preview.component.css'
})
export class ImagePreviewComponent {
  path: string = "";

   constructor(@Inject(MAT_DIALOG_DATA) public data: { path: string; })
   { 
      this.path = data.path; 
   }
}
