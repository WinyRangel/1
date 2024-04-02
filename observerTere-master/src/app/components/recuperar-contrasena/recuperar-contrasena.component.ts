import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent implements OnInit {
  recuperarContrasenasForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.recuperarContrasenasForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  recuperarContrasena() {
    if (this.recuperarContrasenasForm.invalid) {
      return;
    }

    const email = this.recuperarContrasenasForm.get('email')?.value;

    this.authService.recuperarContrasena(email).subscribe(
      (response) => {
        alert('Se ha enviado un correo electrónico con las instrucciones para restablecer tu contraseña');
      },
      (error) => {
        alert('Error al enviar el correo electrónico. Por favor, verifica tu conexión a internet e intenta nuevamente.');
      }
    );
  }
}
