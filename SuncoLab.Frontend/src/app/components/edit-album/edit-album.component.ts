import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../services/gallery/gallery.service';
import { Album } from '../../models/album';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-edit-album',
  standalone: false,
  templateUrl: './edit-album.component.html',
  styleUrl: './edit-album.component.css'
})
export class EditAlbumComponent implements OnInit {
  albums : Album[] = [];
  addAlbumForm! : FormGroup;
  addAlbumClicked: boolean = false;

  constructor(private galleryService: GalleryService, private spinner: SpinnerService, private formBuilder: FormBuilder, private toast: ToastService) {}

  ngOnInit(): void {
    this.addAlbumForm = this.formBuilder.group({
      name: '',
      description: '',
      show: new FormControl(true)
    });

    this.getAlbums();
  }

  getAlbums() {
    this.spinner.show();  
    this.galleryService.getAllAlbums()
    .subscribe(response => {
      if (response) {
        this.albums = response;
      }
      this.spinner.hide();  
    })
  }

  saveAlbum() {
    this.spinner.show();  
    this.galleryService.createAlbum(this.addAlbumForm.value)
    .subscribe(result => {
      if (result) {
        this.toast.create('Album created successfully.');
        this.getAlbums();
      }    
      this.spinner.hide();    
    })
  }

}
