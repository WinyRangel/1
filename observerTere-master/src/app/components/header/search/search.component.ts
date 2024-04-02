import { Component } from '@angular/core';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  userInput: string = '';
  palabrasClave: string[] = ['Empleados', 'Proveedores', 'Recursos']; // Lista de palabras clave
  palabrasFiltradas: string[] = [];
  
  filtrarPalabras(): void {
    if (this.userInput.length === 1) {
      this.palabrasFiltradas = [];
      return;
    }
  
    const userInputLower = this.userInput.toLowerCase();
    this.palabrasFiltradas = this.palabrasClave.filter(palabra =>
      palabra.toLowerCase().startsWith(userInputLower)
    );
  }
  
}
