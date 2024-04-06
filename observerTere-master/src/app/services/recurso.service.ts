import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Recurso } from '../models/recurso';
import { Solicitud } from '../models/solicitud';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  url = 'http://localhost:4000/api/recursos/';
  url2 = 'http://localhost:4000/api/marca/';
  url3 = 'http://localhost:4000/api/gama/';
  url4 = 'http://localhost:4000/api/recursos/obtenerSolicitudes';
  url5 = 'http://localhost:4000/api/recursos/obtenerSolicitudesId';





  constructor(private http: HttpClient) { }

  getRecursos(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarRecurso(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  guardarRecurso(vrecurso: Recurso): Observable<any> {
    return this.http.post(this.url, vrecurso);
  }

  obtenerRecurso(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editarRecurso(id: string, vrecurso: Recurso): Observable<any> {
    return this.http.put(this.url + id, vrecurso);
  }
  obtenerMarca(): Observable<{ nombre: string }[]> {
    return this.http.get<{ nombre: string }[]>(this.url2);
  }
  obtenerGama(): Observable<{ tipo: string }[]> {
    return this.http.get<{ tipo: string }[]>(this.url3);
  }
  solicitarRecurso(solicitud: Solicitud): Observable<any> {
    return this.http.post(this.url + 'solicitar', solicitud);
  }
  obtenerSolicitudes(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(this.url4);
  }
  aprobarSolicitud(solicitud: Solicitud): Observable<any> {
    return this.http.put(`${this.url}/${solicitud._id}/aprobar`, solicitud);
  }
  rechazarSolicitud(solicitud: Solicitud): Observable<any> {
    return this.http.put(`${this.url}/${solicitud._id}/rechazar`, solicitud);
  }
}
