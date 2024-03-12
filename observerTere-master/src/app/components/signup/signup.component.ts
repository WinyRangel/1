import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  usuarioForm: FormGroup;
  mensaje: string = '';
  formularioEnviado: boolean = false; // Variable para controlar si el formulario ha sido enviado

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
     // puesto: ['', Validators.required]
    });
  }
  ngOnInit(): void {

  }

  registrarUsuario() {
    this.formularioEnviado = true; // Marcar el formulario como enviado
    if (this.usuarioForm.invalid) {
      return;
    }

    this.authService.registrarUsuario(this.usuarioForm.value).subscribe(
      (response) => {
        console.log(response);
        this.mensaje = response.mensaje; // Mostrar mensaje de éxito o error
        // Limpiar el formulario después del registro exitoso
        this.usuarioForm.reset();
        this.formularioEnviado = false; // Reiniciar el estado del formulario enviado
      },
      (error) => {
        console.error(error);
        this.mensaje = 'Error en el servidor';
      }
    );
  }
}
