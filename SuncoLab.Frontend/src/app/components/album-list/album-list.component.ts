import { Component, inject, Input } from '@angular/core';
import { Album } from '../../models/album';
import { ImageListComponent } from '../image-list/image-list.component';
import { MatDialog } from '@angular/material/dialog';
import { Authorized } from '../../models/authorization';
import { AuthService } from '../../services/auth/auth.service';

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

  readonly dialog = inject(MatDialog);
  authorized: Authorized | undefined;
    
  constructor(private authService: AuthService) {
    this.authService.authorizedSubject.subscribe(user => {
        if (user && user.isAuth) {
          this.authorized = user;
        }
    });
  }

  openImageModal(albumId: string) {
    let dialogRef = this.dialog.open(ImageListComponent, {
      height: '1000px',
      width: '700px',
      data: { 
        albumId: albumId,
        edit: this.edit
      }
    });
  }

  changeVisibility(album: Album) {
    //TO DO
  }
}
