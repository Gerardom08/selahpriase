import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import Swal from 'sweetalert2';
import { I18nLightService } from '../../shared/i18n/i18nLight.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private i18nService: I18nLightService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((e: HttpErrorResponse) => {
        if (e.error instanceof ErrorEvent) {
          // client side error o netword
          console.error('Un error ha ocurrido:', e.error.message);
        } else {
          // server side error
          if (e.status === 0) {
            Swal.fire(`Error`, 'No hay conexion con el backend.', 'error');
            return throwError(() => e);
          }

          if (e.status === 400 && e.error?.error !== 'invalid_grant') {
            Swal.fire(`${e.error.message}`, e.error.error, 'warning');
            return throwError(() => e);
          }

          if (e.status === 404) {
            Swal.fire(`No encontrado`, e.error?.error, 'warning');
            return throwError(() => e);
          }

          if (e.status === 406) {
            Swal.fire('No aceptado', e.error.message, 'warning');
            return throwError(() => e);
          }

          if (e.status === 409) {
            const esBorradoCancion =
              request.method === 'DELETE' &&
              request.url.includes('/api/canciones/');

            Swal.fire(
              esBorradoCancion
                ? this.i18nService.getTranslation('Song.delete.conflict.title')
                : this.i18nService.getTranslation('Conflict'),
              esBorradoCancion
                ? this.i18nService.getTranslation('Song.delete.conflict.message')
                : e.error?.message,
              'warning'
            );
            return throwError(() => e);
          }

          if (e.status === 412) {
            Swal.fire('No Encontrado', e.error.message, 'warning');
            return throwError(() => e);
          }

          if (e.status === 500) {
            if (e.error.error && e.error.message) {
              Swal.fire(
                `Error Backend ${e.error.message}`,
                e.error.error,
                'error'
              );
            }
          }
        }

        return throwError(() => e);
      })
    );
  }
}
