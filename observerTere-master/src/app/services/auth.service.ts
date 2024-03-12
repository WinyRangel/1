import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn() {
    throw new Error('Method not implemented.');
  }
  authService: any;
  constructor(private http: HttpClient) { }

  urlRegistro = 'http://localhost:4000/api/users/registro';
  urlInicioSesion = 'http://localhost:4000/api/users/inicio-sesion';

  registrarUsuario(datosUsuario: any): Observable<any> {
    return this.http.post<any>(this.urlRegistro, datosUsuario);
  }

  inicioSesion(user: any): Observable<any> {
    return this.http.post<any>(this.urlInicioSesion, user).pipe(
      tap(response => {
        // Si la respuesta incluye un token JWT, guárdalo en el localStorage
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }
  cerrarSesion() {
    // Eliminar el token del localStorage al cerrar sesión
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    // Obtener el token del localStorage
    return localStorage.getItem('token');
  }

  estaAutenticado(): boolean {
    // Verificar si hay un token en el localStorage
    return !!localStorage.getItem('token');
  }
  obtenerUsuarios(): Observable<any> {
    // Agrega el token JWT a las cabeceras de la solicitud
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    
    return this.http.get<any>('http://localhost:4000/api/users/registro', { headers });
  }
}
