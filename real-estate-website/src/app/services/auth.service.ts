import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isExpired: boolean = false;

  constructor(
    private router: Router
  ) { }

  getLoginedToken(){
    return localStorage.getItem('token');
  }

  checkExpired(){
    var token = localStorage.getItem('token');
    const helper = new JwtHelperService();

    this.isExpired = helper.isTokenExpired(token);
    if(this.isExpired==true){
      localStorage.removeItem('token');
    }
    return this.isExpired;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home'])
  }
}
