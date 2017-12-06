import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class SecretHeroService {

  private secretHeroesUrl = 'http://localhost:3002/api/secret/secretheroes'; // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private authHttp: AuthHttp) { }

// ------------- Secret heroes ----------------------

// Get all secret heroes
  getSecretHeroes(): Promise<Hero[]> {
    return this.authHttp
      .get(this.secretHeroesUrl)
      .toPromise()
      .then(response => response.json() as Hero[])
      .catch(this.handleError);
  }

// Get secret hero
  getSecretHero(id: string): Promise<Hero> {
    const url = `${this.secretHeroesUrl}/${id}`;
    return this.authHttp.get(url)
    .toPromise()
    .then(response => response.json() as Hero)
    .catch(this.handleError)
  }

  // Create secret hero
  createSecret(name: string, codeName: string): Promise<Hero> {
    return this.authHttp
      .post(this.secretHeroesUrl, JSON.stringify({name: name, codeName: codeName}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Hero)
      .catch(this.handleError);
  }

  // Delete secret hero
  deleteSecret(hero: Hero): Promise<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.secretHeroesUrl}/${hero.id}`;

    return this.authHttp
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  updateSecret(hero: Hero): Promise<Hero> {
    const url = `${this.secretHeroesUrl}/${hero.id}`;
    return this.authHttp
    .put(url, JSON.stringify(hero), {headers: this.headers})
    .toPromise()
    .then(() => hero)
    .catch(this.handleError);
  }

// ------------- Error handling ---------------------
  private handleError(error: any): Promise<any> {
    console.error('An error occured', error) // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
