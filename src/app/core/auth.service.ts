import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private token: string;

  constructor(private http: Http, private router: Router) { }

  login(credentials: any) {
    this.http.post('http://localhost:3003/authenticate', credentials)
    .map(res => res.json())
    .subscribe(
      // We're assuming the response will be an object
      // with the JWT
      data => {
        this.token = data.token
        localStorage.setItem('token', data.token)
      },
      error => {
        this.token = null;
        console.error(error)
      }
    );
    this.router.navigateByUrl('/dashboard');
  }

  logout() {
    // To log out, just remove the token and profile
    // from local storage
    this.token = null;
    localStorage.removeItem('token');
    // Send the user back to the dashboard after logout
    this.router.navigateByUrl('/dashboard');
  }

  loggedIn() {
    if (this.token) { return true; }
    return false;
  }

  getAuthorizationHeader() {
    return 'Bearer ' + localStorage.getItem('token');
  }
}
