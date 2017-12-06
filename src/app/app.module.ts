import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent }  from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './heroes/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroService } from './shared/hero.service';
import { HeroSearchComponent } from './heroes/hero-search.component';
import { AuthService } from './core/auth.service';
import { AuthGuard } from './core/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { SecretHeroesComponent } from './secret-heroes/secret-heroes.component';
import { SecretHeroDetailComponent } from './secret-heroes/secret-hero-detail.component';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    SecretHeroesComponent,
    SecretHeroDetailComponent,
    LoginComponent
  ],
  providers: [
    HeroService,
    AUTH_PROVIDERS,
    AuthService,
    AuthGuard
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
