import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap  } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { SecretHero } from '../shared/secrethero';
import { SecretHeroService } from '../shared/secrethero.service';

@Component({
  selector: 'app-secret-hero-detail',
  templateUrl: './secret-hero-detail.component.html',
  styleUrls: ['./secret-hero-detail.component.css']
})

export class SecretHeroDetailComponent implements OnInit {

  secretHero: SecretHero;

  constructor(
    private heroService: SecretHeroService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .switchMap((params: ParamMap) => this.heroService.getById(params.get('id')))
    .subscribe(hero => this.secretHero = hero);
  }

  save(): void {
    this.heroService.update(this.secretHero)
    .subscribe(() => this.goBack());
  }

  goBack(savedHero: SecretHero = null): void {
    this.location.back();
  }
}
