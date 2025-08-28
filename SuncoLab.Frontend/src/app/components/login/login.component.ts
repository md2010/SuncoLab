import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   username = '';
   password = '';
   loginFailed = false;
   showPassword = false;

  constructor(private loginService: AuthService, private router: Router, private spinner: SpinnerService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.spinner.show();

    let credentials = {
      Username: this.username,
      Password: this.password
    };

    this.loginService.login(credentials)
    .pipe(
      catchError(error => {
        this.loginFailed = true;
        this.spinner.hide();
        return of(undefined);
      }) 
    )
    .subscribe(response => {
      if (response && response.token) {
        this.loginService.storeData(response);
        this.spinner.hide();
        this.router.navigate(['/']);   
      }  
    })                
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 3000));
  }

}
