import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Authorized } from '../../models/authorization';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { GalleryService } from '../../services/gallery/gallery.service';
import { Album, AlbumFilter } from '../../models/album';

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
  authorized: Authorized | undefined;
  albums!: Album[];
  searchName: string | undefined;

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
    this.spinner.hide();
  }

  getAlbums() {  
    this.galleryService.findAlbums(new AlbumFilter(true, this.searchName))
    .subscribe(response => {
      if (response) {
        this.albums = response;
      }  
    })
  }
  
}
