import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  empleados = [
    { nombre: 'Juan', apeMaertno: 'Pérez' },
  ];
  buscarEmpleados(palabraClave: string) {
    return this.empleados.filter(empleado =>
      empleado.nombre.toLowerCase().includes(palabraClave.toLowerCase())
    );
  }
  constructor() { }
}
