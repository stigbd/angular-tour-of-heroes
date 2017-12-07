import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of'
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../shared/message.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class AuthService {
  private url = 'http://localhost:3003/authenticate'; // URL to web api
  private token: string;
  private currentUser: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService) { }

  login(credentials: any): Observable<any> {
    return this.http.post(this.url, credentials, httpOptions)
    .pipe(
      tap((res: any) => {
        this.token = res.token;
        this.currentUser = credentials.email;
        localStorage.setItem('token', this.token);
        this.log(`logged in user=${this.currentUser}`);
        this.router.navigateByUrl('/dashboard');
      }),
      catchError(this.handleError<string>('addHero'))
    );
  }

  logout() {
    // To log out, just remove the token and profile
    // from local storage
    this.token = null;
    localStorage.removeItem('token');
    this.log(`logged out user: ${this.currentUser}`);
    // Send the user back to the dashboard after logout
    this.router.navigateByUrl('/dashboard');
  }

  loggedIn() {
    if (this.token) { return true; }
    return false;
  }

  getAuthorizationHeader() {
    return 'Bearer ' + this.token;
  }

  // ------------- Error handling ---------------------
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
          this.log(`${operation} failed: ${error.message}`);
          return of(result as T);
      };
    }

    private log(message: string) {
      this.messageService.add('HeroService: ' + message);
    }

}
