import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  url = 'http://localhost:4000/api/empleados/';
  url2 = 'http://localhost:4000/api/departamento/';


  constructor(private http: HttpClient) { }

  getEmpleados(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarEmpleado(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  crearEmpleado(empleado : Empleado): Observable<any>{
    return this.http.post(this.url, empleado);
  }

  obtenerEmpleado(id: string): Observable<any>{
    return this.http.get(this.url + id);
  }

  actualizarEmpleado(id: string, empleado: Empleado): Observable<any>{
    return this.http.put(this.url + id, empleado);
  }
  obtenerDepartamento(): Observable<{ nombre: string }[]> {
    return this.http.get<{ nombre: string, gerente: string }[]>(this.url2);
  }
  obtenerGerente(): Observable<{ gerente: string }[]> {
    return this.http.get<{ gerente: string }[]>(this.url2);
  }
}
