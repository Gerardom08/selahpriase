import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authRequest = request;

    const token = this.authService.token;

    if (token != null) {
      authRequest = this.addToken(request, token);
    }

    return next.handle(authRequest).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !authRequest.url.includes('oauth/token') && error.status === 401) {
        return this.handle401Error(authRequest, next);
      } else {
        return throwError(error);
      }
    }));

  }

  private addToken(request: HttpRequest<any>, token: string) {
    if (request.headers.has('Authorization') && request.headers.get('Authorization')!.includes('Basic')) {
      return request.clone();
    }

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {

      //console.log('isRefreshing...');

      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.access_token);
          return next.handle(this.addToken(request, token.access_token));
        }),
        catchError(err => {
          console.error('::: error => ', err);

          this.isRefreshing = false;

          if (err.status === 401 || (err.status === 400 && err.error?.error === 'invalid_grant')) {

            if (this.authService.isAuthenticated()) {
              this.authService.logout();
              //console.log('usuario autenticado => cerrando sesion...');
            }

            this.router.navigate(['/on-login']);

            // Closing modals; TODO: check close modals without jquery
            // $('.modal').modal('hide');
            // $('body').removeClass('modal-open');
            // $('.modal-backdrop').remove();
          }

          return throwError(err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(access_token => next.handle(this.addToken(request, access_token)))
      );
    }
  }

}
