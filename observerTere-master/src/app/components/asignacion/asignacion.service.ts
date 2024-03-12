import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';

export interface Empleado {
  _id: string;
  email?: string;
  idEmpleado: number|null;
  nombre: string;
  aPaterno: string;
  aMaterno: string;
  isSeleccionado?: boolean;
}

export interface Recurso {
  numSerie: string;
  recurso: string;
  marca: string;
  modelo: string;
  isSeleccionado?: boolean;
  asignadoA?: string|null;
}

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  headers: HttpHeaders;
  apiRecurso = 'http://localhost:4000/api/recursos'
  apiEmpleado = 'http://localhost:4000/api/empleados'

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  getEmpleados(filtros: Empleado): Promise<Empleado[]> {
    const retorno = firstValueFrom(
      this.httpClient.post<Empleado[]>(`${this.apiEmpleado}/filtros`, filtros, {headers: this.headers})
    );
    console.info(retorno);
    return retorno;
  }

  getRecursos(filtros: Recurso) : Promise<Recurso[]> {
    const retorno = firstValueFrom(
      this.httpClient.post<Recurso[]>(`${this.apiRecurso}/filtros`, filtros, {headers: this.headers})
    );
    return retorno;
  }

  asignarRecursoAEmpleado(empleado: Empleado, recursos: Recurso[]): Promise<any> {
    const retorno = firstValueFrom(this.httpClient.post(`${this.apiRecurso}/asignar`, {empleado, recursos}, {headers: this.headers}));
    return retorno;
  }

  filtrarRecursosPorEmpleado(idEmpleado: string): Promise<any> {
    const retorno = firstValueFrom(this.httpClient.get(`${this.apiRecurso}/empleado?idEmpleado=${idEmpleado}`, {headers: this.headers}));
    return retorno;
  }

  actualizarEmpleado(recursos: Recurso[]): Promise<any> {
    const retorno = firstValueFrom(this.httpClient.post(`${this.apiRecurso}/asignar/empleado`, recursos, {headers: this.headers}));
    return retorno;
  }

  guardarFalla(formFalla: any): Promise<any> {
    const retorno = firstValueFrom(this.httpClient.post(`${this.apiRecurso}/reportar/falla`, formFalla, {headers: this.headers}));
    return retorno;
  }

}
