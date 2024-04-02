import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token!: string;
  newPassword!: string;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    // Obtener el token de la URL
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });
  }

  cambiarContrasena() {
    // Validar la nueva contraseña antes de enviar la solicitud
    if (!this.validarNuevaContrasena(this.newPassword)) {
      alert('La nueva contraseña no cumple con los requisitos mínimos de seguridad.');
      return;
    }

    // Llamar al método del servicio de autenticación para restablecer la contraseña
    this.authService.cambiarContrasena(this.token, this.newPassword).subscribe(
      (response) => {
        alert('Contraseña restablecida correctamente');
        this.router.navigate(['/signin']);
      },
      (error) => {
        alert('Error al restablecer la contraseña. Por favor, intenta nuevamente.');
      }
    );
  }

  validarNuevaContrasena(contrasena: string): boolean {
    return contrasena.length >= 8;
  }
}