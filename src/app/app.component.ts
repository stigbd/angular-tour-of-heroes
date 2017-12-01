import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'my-app',
  styleUrls: [ './app.component.css' ],
  templateUrl: './app.component.html'
})

export class AppComponent {

  title = 'Tour of Heroes';

  constructor(private authService: AuthService) {}
}
