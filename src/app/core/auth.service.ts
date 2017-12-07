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
  private token: string;
  private url = 'http://localhost:3003/authenticate'; // URL to web api

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService) { }

  login(credentials: any): Observable<string> {
    return this.http.post(this.url, credentials, httpOptions)
    .pipe(
      tap((token: string) => {
        this.token = token;
        localStorage.setItem('token', token);
        this.log(`logged in user=${credentials.email}`);
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
  // ------------- Error handling ---------------------
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
          console.error(error) // for demo purposes only
          this.log(`${operation} failed: ${error.message}`);
          return of(result as T);
      };
    }

    private log(message: string) {
      this.messageService.add('HeroService: ' + message);
    }

}
