import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './secret-heroes.component.html',
  styleUrls: ['./secret-heroes.component.css']
})

export class SecretHeroesComponent implements OnInit {
  secretHeroes: Hero[];
  selectedHero: Hero;
  addingHero = false;
  error: any;

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  getSecretHeroes(): void {
    this.heroService
      .getSecretHeroes()
      .then(heroes => this.secretHeroes = heroes)
      .catch(error => this.error = error);
  }

  addSecretHero(): void {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero): void {
    this.addingHero = false;
    if (savedHero) { this.getSecretHeroes(); }
  }

  deleteSecretHero(hero: Hero, event: any): void {
    event.stopPropagation();
    this.heroService
      .deleteSecret(hero)
      .then(res => {
        this.secretHeroes = this.secretHeroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null}
      })
      .catch(error => this.error = error);
  }

  ngOnInit(): void {
    this.getSecretHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.addingHero = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/secret-detail', this.selectedHero.id]);
  }
}
