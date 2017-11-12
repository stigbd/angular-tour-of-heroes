import { Component } from '@angular/core';
import { AuthService } from './auth.service';

interface Credentials {
  username: string,
  password: string
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})

export class LoginComponent {
  credentials: Credentials;

  constructor(private auth: AuthService) { }

  onLogin(credentials: any) {
    this.auth.login(credentials);
  }
}
