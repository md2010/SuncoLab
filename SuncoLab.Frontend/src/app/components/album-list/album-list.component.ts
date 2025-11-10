import { Component, inject, Input } from '@angular/core';
import { Album } from '../../models/album';
import { ImageListComponent } from '../image-list/image-list.component';
import { MatDialog } from '@angular/material/dialog';
import { Authorized } from '../../models/authorization';
import { AuthService } from '../../services/auth/auth.service';
import { GalleryService } from '../../services/gallery/gallery.service';
import { ToastService } from '../../services/toast/toast.service';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-album-list',
  standalone: false,
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.css'
})
export class AlbumListComponent {
  @Input()
  albums!: Album[]; 

  @Input()
  edit: boolean = false;

  authorized: Authorized | undefined;
    
  constructor(
    private authService: AuthService, 
    private galleryService: GalleryService, 
    private toast: ToastService, 
    private dialog: MatDialog) {
    this.authService.authorizedSubject.subscribe(user => {
        if (user && user.isAuth) {
          this.authorized = user;
        }
    });
  }

  openImageModal(albumId: string) {
    if (this.edit) {
      this.dialog.open(ImageListComponent, {
        height: '600px',
        width: '1300px',
        data: { 
          albumId: albumId,
          edit: this.edit
        }
      });
    }
    else {
      this.dialog.open(CarouselComponent, {
        height: '700px',
        width: '1000px',
        data: { 
          albumId: albumId
        }
      });
    }
  }

  changeVisibility(album: Album) {
    this.galleryService.changeAlbumVisibility(album.id, album.show)
    .subscribe((response) => {
      if (response) {
         this.toast.create('Album visibility changed.');
      }
    })
  }
}
