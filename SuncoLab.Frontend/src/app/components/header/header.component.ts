import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Authorized } from '../../models/authorization';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  authorized: Authorized | undefined;
  
    constructor(private authService: AuthService, private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
      this.authService.authorizedSubject.subscribe(user => {
          if (user && user.isAuth) {
            this.authorized = user;
          }
          else {
            this.authorized = undefined;
          }
          this.cd.detectChanges();
      });
    }

    logout(): void {
      this.authService.logout();
  }
}
