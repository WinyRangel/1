import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { passwordValidator } from '../signup/validators'; // Importa la función de validación desde el archivo validators.ts

import Swal from 'sweetalert2';

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
        Swal.fire({
          icon: "success",
          text: "Contraseña restablecida exitosamente",
        });
        this.router.navigate(['/signin']);
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Ha ocurrido un error!",
          footer: 'Es posible que el token haya caducado'
        });
      }
    );
  }

  
  validarNuevaContrasena(contrasena: string): boolean {
    return contrasena.length >= 8;
  }
}