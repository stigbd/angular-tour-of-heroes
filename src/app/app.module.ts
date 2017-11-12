import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent }  from './app.component';
import { DashboardComponent } from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent } from './heroes.component';
import { HeroService } from './hero.service';
import { HeroSearchComponent } from './hero-search.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { LoginComponent } from './login.component';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    //InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
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
