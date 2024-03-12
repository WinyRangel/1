import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-listar-empleados',
  templateUrl: './listar-empleados.component.html',
  styleUrls: ['./listar-empleados.component.css']
})
export class ListarEmpleadosComponent implements OnInit{
  listEmpleados: Empleado [] = [];
  filterEmpleado = '';
  

  constructor(private _empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  obtenerEmpleados() {
    this._empleadoService.getEmpleados().subscribe(data => {
      console.log(data);
      this.listEmpleados = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarEmpleado(id: any) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este empleado?');
  
    if (confirmacion) {
      this._empleadoService.eliminarEmpleado(id).subscribe(
        data => {
          alert('Empleado Eliminado');
          this.obtenerEmpleados();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  

  
}
