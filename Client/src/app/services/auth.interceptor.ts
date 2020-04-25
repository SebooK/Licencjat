import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {  constructor(public auth: AuthService) {}  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
        setHeaders: {
            'x-auth-token':`Bearer ${this.auth.getToken()}`
        }
    });    return next.handle(request);
}
}