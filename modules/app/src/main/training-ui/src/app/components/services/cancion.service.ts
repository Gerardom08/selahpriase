import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ResourceDefinition } from '../config/resource-definitions.config';
import { CancionesDTO } from '../interfaces/cancionDTO';

@Injectable({
  providedIn: 'root'
})
export class CancionService {

  private urlDefinitions: ResourceDefinition = new ResourceDefinition();

  constructor(private http: HttpClient) {
  }

  public getCancion(
    pagina: number,
    tamano: number
  ): Observable<any> {

    const params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('tamano', tamano.toString());

    return this.http.get<any>(
      `${this.urlDefinitions.cancionUrl}/paginado`,
      { params }
    );
  }

  public crearCancion(cancion: CancionesDTO): Observable<CancionesDTO> {
    return this.http.post<CancionesDTO>(
      this.urlDefinitions.cancionUrl,
      cancion
    );
  }

  public actualizarCancion(idCancion: number, cancion: CancionesDTO): Observable<CancionesDTO> {
    return this.http.put<CancionesDTO>(
      `${this.urlDefinitions.cancionUrl}/${idCancion}`,
      cancion
    );
  }

  public deleteCancion(idCancion: number): Observable<void> {
    return this.http.delete<void>(
      `${this.urlDefinitions.cancionUrl}/${idCancion}`
    );
  }

}