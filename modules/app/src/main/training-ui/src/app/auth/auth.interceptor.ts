import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError(e => {
        if (e.status === 403) {
          Swal.fire('Acceso denegado', `Hola ${this.authService.user.username} no tienes acceso a este recurso.`, 'warning');
          this.router.navigate(['/home']);
        }

        return throwError(() => e);
      })
    );
  }

}
