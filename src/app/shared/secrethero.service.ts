import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of'
import { catchError, map, tap } from 'rxjs/operators';

import { SecretHero } from './secrethero';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class SecretHeroService {

  private url = 'http://localhost:3002/api/secret/secretheroes'; // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

// Get all secret SecretHeroes
  get(): Observable<SecretHero[]> {
    return this.http.get<SecretHero[]>(this.url)
      .pipe(
        tap(secretHeroes => this.log('fetched secret heroes')),
        catchError(this.handleError('getSecretHeroes', []))
      )
  }

// Get secret SecretHero
  getById(id: string): Observable<SecretHero> {
    const url = `${this.url}/${id}`;
    return this.http.get<SecretHero>(url)
      .pipe(
        tap(_ => this.log(`fetched secret hero id=${id}`)),
        catchError(this.handleError<SecretHero>(`getSecretHero id=${id}`))
    )
  }


  // Create secret SecretHero
  create(secretHero: SecretHero): Observable<SecretHero> {
    return this.http
      .post(this.url, secretHero, httpOptions)
        .pipe(
          tap((secretHero: SecretHero) => this.log(`added secret hero w/ id=${secretHero.id}`)),
          catchError(this.handleError<SecretHero>('createSecret'))
        );
  }

  // Delete secret SecretHero
  delete(secretHero: SecretHero | number): Observable<SecretHero> {
    const id = typeof secretHero === 'number' ? secretHero : secretHero.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<SecretHero>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted secret hero id=${id}`))
      );
  }

// Update secret hero
  update(secretHero: SecretHero): Observable<SecretHero> {
    const url = `${this.url}/${secretHero.id}`;
    return this.http
    .put(url, secretHero, httpOptions)
      .pipe(
        tap(_ => this.log(`updated secret hero id=${secretHero.id}`)),
        catchError(this.handleError<any>('update'))
      );
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
    this.messageService.add('SecretHeroService: ' + message);
  }
}
