import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }  from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './heroes/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroService } from './shared/hero.service';
import { SecretHeroService } from './shared/secrethero.service';
import { HeroSearchComponent } from './heroes/hero-search.component';
import { AuthService } from './core/auth.service';
import { AuthGuard } from './core/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { SecretHeroesComponent } from './secret-heroes/secret-heroes.component';
import { SecretHeroDetailComponent } from './secret-heroes/secret-hero-detail.component';
import { MessageService } from './shared/message.service';
import { MessagesComponent } from './messages/messages.component';
import { AuthInterceptor } from './core/auth.interceptor';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
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
    LoginComponent,
    MessagesComponent
  ],
  providers: [
    HeroService,
    SecretHeroService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthService,
    AuthGuard,
    MessageService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
