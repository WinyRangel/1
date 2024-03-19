import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  url = 'http://localhost:4000/api/proveedor/';
  constructor(private http: HttpClient) { }

  getProveedores(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarProveedor(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  crearProveedor(proveedor : Proveedor): Observable<any>{
    return this.http.post(this.url, proveedor);
  }

  obtenerProveedor(id: string): Observable<any>{
    return this.http.get(this.url + id);
  }

  actualizarProveedor(id: string, proveedor: Proveedor): Observable<any>{
    return this.http.put(this.url + id, proveedor);
  }
}
