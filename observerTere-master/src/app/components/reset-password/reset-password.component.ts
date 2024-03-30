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
  resetUrl!: string;
 

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
     // Obtener el token de la URL
     this.route.params.subscribe(params => {
      const token = params['token'];
      // Construir la URL de restablecimiento de contraseña
      this.resetUrl = `http://localhost:4200/recuperar-contrasena/${token}`;
      // Redirigir automáticamente al enlace de restablecimiento de contraseña
      this.router.navigateByUrl(this.resetUrl);
    });
  }

  recuperarContrasena() {
    // Llamar al método del servicio de autenticación para restablecer la contraseña
    this.authService.recuperarContrasena(this.token, this.newPassword).subscribe(
      (response) => {
        alert('Contraseña restablecida correctamente');
        // Redirigir al usuario a la página de inicio de sesión u otra página de tu aplicación
      },
      (error) => {
        alert('Error al restablecer la contraseña. Por favor, intenta nuevamente.');
      }
    );
  }
}
