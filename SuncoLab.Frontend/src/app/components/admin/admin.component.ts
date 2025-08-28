import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Authorized } from '../../models/authorization';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
    authorized: Authorized | undefined;
    showEditAlbum = false;
    showEditMagazine = false;
    showRegister = false;
  
    constructor(private authService: AuthService) {
      this.authService.authorizedSubject.subscribe(user => {
          if (user && user.isAuth) {
            this.authorized = user;
          }
      });
    }

    hideCurrentEditScreen(optionName: string) {
      if (optionName == 'magazine') {
        this.showEditAlbum = false;
        this.showRegister = false;   
      }
      if (optionName == 'album') {
        this.showEditMagazine = false;
        this.showRegister = false;
      }
      if (optionName == 'register') {
        this.showEditAlbum = false;
        this.showEditMagazine = false;
      }
    }
}
