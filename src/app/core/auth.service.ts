import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  constructor(private http: Http, private router: Router) { }

  login(credentials: any) {
    this.http.post('http://localhost:3003/authenticate', credentials)
    .map(res => res.json())
    .subscribe(
      // We're assuming the response will be an object
      // with the JWT
      data => localStorage.setItem('token', data.token),
      error => console.error(error)
    );
    this.router.navigateByUrl('/dashboard');
  }

  logout() {
    // To log out, just remove the token and profile
    // from local storage
    localStorage.removeItem('token');
    // Send the user back to the dashboard after logout
    this.router.navigateByUrl('/dashboard');
  }

  loggedIn() {
    return tokenNotExpired();
  }

  getAuthorizationHeader() {
    return 'Bearer ' + localStorage.getItem('token');
  }
}
