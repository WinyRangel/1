import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Recurso } from '../models/recurso';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  url = 'http://localhost:4000/api/recursos/';
  url2 = 'http://localhost:4000/api/marca/';
  url3 = 'http://localhost:4000/api/gama/';




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
}
