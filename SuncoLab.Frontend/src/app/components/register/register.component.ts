import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
   username = '';
   password = '';
   repeatPassword = '';
   loginFailed = false;
   registrationFailed = false;
   registrationSuccess = false;
   showPassword = false;
   showUnmatchedPasswordMessage = false;

   constructor(private loginService: AuthService, private router: Router, private spinner: SpinnerService) {}

   togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  register() {
    if (this.repeatPassword != this.password) {
      this.showUnmatchedPasswordMessage = true;
      return;
    }
    else {
      this.showUnmatchedPasswordMessage = false;
    }

    this.spinner.show();

    let credentials = {
      Username: this.username,
      Password: this.password
    };

    this.loginService.register(credentials)
    .pipe(
      catchError(error => {
        this.registrationFailed = true;
        this.spinner.hide();
        return of(undefined);
      }) 
    )
    .subscribe(async response => {
        this.registrationSuccess = true;
        await this.delay();

        if (response && response.token) {
          this.loginService.storeData(response);
          this.spinner.hide();
          this.router.navigate(['/'])
          .then(() => {
              window.location.reload();
            });
        }  
    })   
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, 3000));
  }
}
