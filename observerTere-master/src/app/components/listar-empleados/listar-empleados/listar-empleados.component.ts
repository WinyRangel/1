import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-empleados',
  templateUrl: './listar-empleados.component.html',
  styleUrls: ['./listar-empleados.component.css']
})
export class ListarEmpleadosComponent implements OnInit{
  listEmpleados: Empleado [] = [];
  filterEmpleado = '';
  

  constructor(private _empleadoService: EmpleadoService, private toastr: ToastrService) { }

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
      this._empleadoService.eliminarEmpleado(id).subscribe(
        data => {
          Swal.fire({
            title: "¿Estás seguro de querer eliminar a este empleado?",
            text: "Esta acción no puede ser revertidad",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, estoy seguro."
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Eliminado",
                text: "Este empleado ha sido eliminado.",
                icon: "success"
              });
            }
          });
          this.obtenerEmpleados();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

