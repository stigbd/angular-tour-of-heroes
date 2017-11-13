import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap  } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-secret-hero-detail',
  templateUrl: './secret-hero-detail.component.html',
  styleUrls: ['./secret-hero-detail.component.css']
})

export class SecretHeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
    .subscribe(hero => this.hero = hero);
  }

  save(): void {
    this.heroService.updateSecret(this.hero)
    .then(() => this.goBack());
  }

  goBack(savedHero: Hero = null): void {
    this.location.back();
  }
}
