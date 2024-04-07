import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { passwordValidator } from './validators'; // Importa la función de validación desde el archivo validators.ts
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  usuarioForm: FormGroup;
  mensaje: string = '';
  formularioEnviado: boolean = false; // Variable para controlar si el formulario ha sido enviado
  passwordVisible: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), passwordValidator()]],
      confirmPassword: ['', Validators.required] 
    }, {
      validators: this.passwordMatchValidator
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
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          showConfirmButton: false,
          timer: 1500
        });
        this.usuarioForm.reset();
        this.formularioEnviado = false; // Reiniciar el estado del formulario enviado
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al registrarse",
          footer: 'El nombre de usuario o la contraseña ya existen.'
        });
        console.error(error);
      }
    );
  }
passwordMatchValidator(form: FormGroup) {
  const password = form.get('password');
  const confirmPassword = form.get('confirmPassword');

  if (password?.value !== confirmPassword?.value) { 
    confirmPassword?.setErrors({ passwordsNotMatching: true });
        confirmPassword?.setErrors({ passwordsNotMatching: true });

  } else {
    
    confirmPassword?.setErrors(null);

  }
}
togglePasswordVisibility(): void {
  this.passwordVisible = !this.passwordVisible;
}
}
