import { Injectable } from '@angular/core';
import { HttpService } from '../htpp/http.service';
import { BehaviorSubject, firstValueFrom, Observable, of } from 'rxjs';
import { Authorized, AuthResponse } from '../../models/authorization';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authorizedSubject: BehaviorSubject<Authorized | undefined> = new BehaviorSubject<Authorized | undefined>(undefined)
  baseUrl: string = '/login/'

  constructor(private httpService: HttpService, private router: Router) {
    this.checkIsAuthorized()
  }

   async checkIsAuthorized() : Promise<boolean> {
    if (sessionStorage.getItem("token") == null) {
      this.setProperties(false);
      return false; 
    } 
    else {
      var result = await firstValueFrom(this.isAuthorized())
      if (result) {
        this.setProperties(true);
        return true;
      }
      else {
        this.setProperties(false);
        return false;
      }
    }
   }

   isAuthorized() : Observable<boolean>{
    if (sessionStorage.getItem("token") !== null) {
      return this.httpService.post<boolean>(this.baseUrl + 'is-authorized/', { "token" : sessionStorage.getItem("token") });
    }
    else {
      return of(false);
    }
   }

  login(credentials: any) : Observable<AuthResponse | undefined> {
    JSON.stringify(credentials);    
    return this.httpService.post<AuthResponse | undefined>(this.baseUrl + 'login', credentials);
  }

  logout() {
    this.setProperties(false);
    this.router.navigate(['/login']);
  }

  register(credentials: any) : Observable<AuthResponse | undefined> {
    JSON.stringify(credentials);    
    return this.httpService.post<AuthResponse | undefined>(this.baseUrl + 'register', credentials);
  }

  storeData(data: AuthResponse) {
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("userId", data.userId)
    sessionStorage.setItem('role',data.roleName);
    this.setProperties(true);
  }

  setProperties(authorized: boolean) {
    if (authorized == false) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userId")
      sessionStorage.removeItem('role');
    }

    this.authorizedSubject.next({
      isAuth : authorized, 
      userId: sessionStorage.getItem("userId"), 
      roleName : sessionStorage.getItem("role"),
      token: sessionStorage.getItem("token")
    });    
  }
}


