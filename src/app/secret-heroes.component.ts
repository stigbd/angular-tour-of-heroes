import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-secret-heroes',
  templateUrl: './secret-heroes.component.html',
  styleUrls: ['./secret-heroes.component.css']
})

export class SecretHeroesComponent implements OnInit {
  secretHeroes: Hero[];
  selectedHero: Hero;

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  ngOnInit(): void {
    this.getSecretHeroes();
  }

  getSecretHeroes(): void {
    this.heroService
      .getSecretHeroes()
      .then(heroes => this.secretHeroes = heroes)
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    console.log('Id of selectedHero',this.selectedHero.id);
  }

  gotoDetail(): void {
    this.router.navigate(['secret-detail', this.selectedHero.id]);
  }

  addSecretHero(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.createSecret(name)
      .then(hero => {
        this.secretHeroes.push(hero);
        this.selectedHero = null;
      });
  }

  deleteSecretHero(hero: Hero): void {
    this.heroService
      .deleteSecret(hero)
      .then(res => {
        this.secretHeroes = this.secretHeroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null}
      })
  }
}
