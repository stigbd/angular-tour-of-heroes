import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  login(credentials: any) {
    this.http.post('http://localhost:3003/authenticate', credentials)
    .map(res => res.json())
    .subscribe(
      // We're assuming the response will be an object
      // with the JWT
      data => localStorage.setItem('token', data.token),
      error => console.error(error)
    );
  }

  logout() {
    // To log out, just remove the token and profile
    // from local storage
    localStorage.removeItem('token');
  }

  loggedIn() {
    return tokenNotExpired();
  }
}
