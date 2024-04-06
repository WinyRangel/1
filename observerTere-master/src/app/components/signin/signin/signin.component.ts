import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signinForm: FormGroup;
  passwordVisible: boolean = false;



  errorMessage: string = '';

  constructor(private fb: FormBuilder, private registroService: AuthService, private router: Router) {
    this.signinForm = this.fb.group({
      //email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signin() {
    if (this.signinForm.invalid) {
      return;
    }

    const user = {
      email: this.signinForm.get('email')?.value,
      password: this.signinForm.get('password')?.value,
      username: this.signinForm.get('username')?.value

      //recaptchaToken: '' 
    };

    this.registroService.inicioSesion(user).subscribe(
      (response) => {
        Swal.fire({
          title: "Inicio de sesión exitoso",
          icon: "success"
        });
        this.router.navigate(['/inicio']); // Redirigir a la página de inicio
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Parece que ha habido un error con tus credenciales. Por favor, verifica nuevamente.",
        });
      }
    );
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
