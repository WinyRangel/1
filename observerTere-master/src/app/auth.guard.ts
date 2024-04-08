import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.estaAutenticado()) {
      const expectedRoles = route.data['expectedRoles']; // Acceder utilizando notación de índice
      const userRole = this.authService.obtenerRol(); // Obtener el rol del usuario

      //console.log('Rol del usuario:', userRole);
      //console.log('Roles esperados:', expectedRoles);
      
      if (expectedRoles && expectedRoles.indexOf(userRole) === -1) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Acceso no autorizado",
        });
        this.router.navigate(['/inicio']);
        return false;
      }
      return true;
    }else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Navegación no permitida",
      });
      this.router.navigate(['/signin']); // Redirige al usuario a la página de inicio de sesión si no está autenticado
      return false; // Bloquea la navegación
    }
  }

  /*
  canActivate(): boolean {
    if (this.authService.estaAutenticado()) {
      return true; // El usuario está autenticado, permite la navegación
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Navegación no permitida",
      });
      this.router.navigate(['/signin']); // Redirige al usuario a la página de inicio de sesión si no está autenticado
      return false; // Bloquea la navegación
    }
  }



        console.log('Decoded token:', decodedToken);

  */

}
