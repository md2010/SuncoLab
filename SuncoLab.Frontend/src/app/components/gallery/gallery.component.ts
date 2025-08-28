import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Authorized } from '../../models/authorization';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { GalleryService } from '../../services/gallery/gallery.service';
import { Album } from '../../models/album';

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
  authorized: Authorized | undefined;
  albums!: Album[];

  constructor(private authService: AuthService, private spinner: SpinnerService, private galleryService: GalleryService) {
    this.authService.authorizedSubject.subscribe(user => {
          if (user && user.isAuth) {
            this.authorized = user;
          }
      });
  } 

  ngOnInit(): void {
    this.spinner.show();
    this.getAlbums();
  }

  getAlbums() {  
    this.galleryService.getAllAlbums()
    .subscribe(response => {
      if (response) {
        this.albums = response;
      }
      this.spinner.hide();  
    })
  }
  
}
