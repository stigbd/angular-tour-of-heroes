import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { Hero } from '../shared/hero';

@Injectable()
export class HeroSearchService {

  private heroesUrl = environment.heroesUrl; // URL to web api
  constructor(private http: HttpClient) {}

  search(term: string): Observable<Hero[]> {
    const url = `${this.heroesUrl}/?name=${term}`;
    return this.http
      .get(url)
      .map(response => response as Hero[]);
  }
}
