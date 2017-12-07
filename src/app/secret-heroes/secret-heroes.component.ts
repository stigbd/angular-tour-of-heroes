import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SecretHero } from '../shared/secrethero';
import { SecretHeroService } from '../shared/secrethero.service';

@Component({
  selector: 'my-secret-heroes',
  templateUrl: './secret-heroes.component.html',
  styleUrls: ['./secret-heroes.component.css']
})

export class SecretHeroesComponent implements OnInit {
  secretHeroes: SecretHero[];
  selectedHero: SecretHero;

  constructor(
    private router: Router,
    private heroService: SecretHeroService) { }

  ngOnInit(): void {
    this.getSecretHeroes();
  }

  getSecretHeroes(): void {
    this.heroService
      .getSecretHeroes()
      .then(secretHeroes => this.secretHeroes = secretHeroes)
  }

  onSelect(secretHero: SecretHero): void {
    this.selectedHero = secretHero;
  }

  gotoDetail(): void {
    this.router.navigate(['secret-detail', this.selectedHero.id]);
  }

  addSecretHero(name: string, codeName: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.createSecret(name, codeName)
      .then(secretHero => {
        this.secretHeroes.push(secretHero);
        this.selectedHero = null;
      });
  }

  deleteSecretHero(secretHero: SecretHero): void {
    this.heroService
      .deleteSecret(secretHero)
      .then(res => {
        this.secretHeroes = this.secretHeroes.filter(h => h !== secretHero);
        if (this.selectedHero === secretHero) { this.selectedHero = null}
      })
  }
}
