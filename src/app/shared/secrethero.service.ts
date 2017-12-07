import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { SecretHero } from './secrethero';

@Injectable()
export class SecretHeroService {

  private secretHeroesUrl = 'http://localhost:3002/api/secret/secretheroes'; // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private authHttp: AuthHttp) { }

// ------------- Secret SecretHeroes ----------------------

// Get all secret SecretHeroes
  getSecretHeroes(): Promise<SecretHero[]> {
    return this.authHttp
      .get(this.secretHeroesUrl)
      .toPromise()
      .then(response => response.json() as SecretHero[])
      .catch(this.handleError);
  }

// Get secret SecretHero
  getSecretHero(id: string): Promise<SecretHero> {
    const url = `${this.secretHeroesUrl}/${id}`;
    return this.authHttp.get(url)
    .toPromise()
    .then(response => response.json() as SecretHero)
    .catch(this.handleError)
  }

  // Create secret SecretHero
  createSecret(name: string, codeName: string): Promise<SecretHero> {
    return this.authHttp
      .post(this.secretHeroesUrl, JSON.stringify({name: name, codeName: codeName}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as SecretHero)
      .catch(this.handleError);
  }

  // Delete secret SecretHero
  deleteSecret(hero: SecretHero): Promise<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.secretHeroesUrl}/${hero.id}`;

    return this.authHttp
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  updateSecret(hero: SecretHero): Promise<SecretHero> {
    const url = `${this.secretHeroesUrl}/${hero.id}`;
    return this.authHttp
    .put(url, JSON.stringify(hero), {headers: this.headers})
    .toPromise()
    .then(() => SecretHero)
    .catch(this.handleError);
  }

// ------------- Error handling ---------------------
  private handleError(error: any): Promise<any> {
    console.error('An error occured', error) // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
