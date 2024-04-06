import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitarRecursoService {

  private apiUrl = 'http://localhost:4000/solicitudes';

  constructor( private http: HttpClient) { }

  solicitarRecurso(datosSolicitud: any) {
    return this.http.post(this.apiUrl, datosSolicitud);
  }
}
