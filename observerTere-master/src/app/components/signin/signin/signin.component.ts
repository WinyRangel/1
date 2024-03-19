import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signinForm: FormGroup;

  errorMessage: string = '';

  constructor(private fb: FormBuilder, private registroService: AuthService, private router: Router) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  signin() {
    if (this.signinForm.invalid) {
      return;
    }

    const user = {
      email: this.signinForm.get('email')?.value,
      password: this.signinForm.get('password')?.value
      //recaptchaToken: '' 
    };

    this.registroService.inicioSesion(user).subscribe(
      (response) => {
        // Manejar la respuesta del servidor
        alert("Inicio de sesión exitoso");
        this.router.navigate(['/inicio']); // Redirigir a la página de inicio
      },
      (error) => {
        this.errorMessage = 'Error en el inicio de sesión. Por favor, verifica tus credenciales.';
      }
    );
  }
}
