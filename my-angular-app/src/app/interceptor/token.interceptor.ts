import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = req.clone({
            setHeaders: {
                Authorization: `${localStorage.getItem('IMStoken')}`
            }
        })
        return next.handle(authReq).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && event.body.auth === false) {
                    this.router.navigate(['login'])
                }
            })
        );
    }
}