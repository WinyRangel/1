import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.estaAutenticado()) {
      return true; // El usuario está autenticado, permite la navegación
    } else {
      alert('Navegación no permitida')
      this.router.navigate(['/signin']); // Redirige al usuario a la página de inicio de sesión si no está autenticado
      return false; // Bloquea la navegación
    }
  }

}
