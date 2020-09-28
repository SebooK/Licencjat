import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {AuthService} from "./auth.service";
import {Observable, from} from "rxjs";
import {mergeMap} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization:`${this.auth.getToken()}`
            }
        });
        return next.handle(request);

/*
            return from(this.auth.getToken()).pipe(
                mergeMap( (val) => {
                    request = request.clone({
                        setHeaders: {
                            'Authorization':`${val}`
                        }
                });
                    return next.handle(request);
            }))
 */
    }


}

