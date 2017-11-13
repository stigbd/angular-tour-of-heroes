import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  save(): void {

  }

  goBack(savedHero: Hero = null): void {

  }
}
