import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  darkMode: boolean = false;

  usuarioAutenticado: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}
  
  cerrarSesion() {
    Swal.fire({
      title: "Regresa pronto!",
      text: "ACTUNITY te desea un buen día",
      imageUrl: "https://i.pinimg.com/originals/74/09/3b/74093b39826557182c1fb8448a630639.gif",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image"
    });
    this.authService.cerrarSesion();
    this.router.navigate(['/signin']); // Redirige al usuario a la página de inicio de sesión
  }
  estaAutenticado(): boolean {
    return this.authService.estaAutenticado();
  }
    ngOnInit(): void {
    this.usuarioAutenticado = this.authService.estaAutenticado();
  }
  isActive(route: string): boolean {
    return this.router.url === route;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
