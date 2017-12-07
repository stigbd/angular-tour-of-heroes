import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injector } from '@angular/core';


import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.injector.get(AuthService);
    // Get the auth header from the service.
    const authHeader = auth.getAuthorizationHeader();
    // Clone the request to add the new header.
    const authReq = req.clone({setHeaders: {Authorization: authHeader}});
    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }
}
