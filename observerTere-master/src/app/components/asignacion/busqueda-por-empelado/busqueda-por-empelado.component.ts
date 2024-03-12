import { Component, OnInit } from '@angular/core';
import { AsignacionService, Empleado, Recurso } from '../asignacion.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-busqueda-por-empelado',
  templateUrl: './busqueda-por-empelado.component.html',
  styleUrls: ['./busqueda-por-empelado.component.css'],
  providers: [AsignacionService]
})
export class BusquedaPorEmpeladoComponent implements OnInit {

  dataEmpleados: Empleado[];
  dataRecursos: Recurso[];

  filtroEmpleado: FormGroup;

  constructor(private formBuilder: FormBuilder, private asignacionService: AsignacionService) {
    this.filtroEmpleado = formBuilder.group({
      idEmpleado: [null],
      nombre: [''],
      aPaterno: [''],
      aMaterno: ['']
    });
    this.dataEmpleados = [];
    this.dataRecursos = [];
  }

  ngOnInit(): void {
    this.filtroEmpleado = this.formBuilder.group({
      idEmpleado: [null],
      nombre: [''],
      aPaterno: [''],
      aMaterno: ['']
    });
    this.dataEmpleados = [];
    this.dataRecursos = [];
  }

  event(evento: any, recurso: Recurso) {
    recurso.isSeleccionado = evento.target.checked;
  }

  eventEmpleado(evento:any, empleado: Empleado) {
    this.dataRecursos = [];
    if(evento.target.checked) {
      this.dataEmpleados.forEach(e => {
        e.isSeleccionado = false;
      })
    }
    empleado.isSeleccionado = evento.target.checked;
    const idEmpleado:string = empleado._id;
    if(idEmpleado) {
      this.filtrarRecursosPorEmpleado(idEmpleado);
    }
  }

  filtrarEmpleados(filtroEmpleado: Empleado) {
    this.dataEmpleados = [];
    this.asignacionService.getEmpleados(filtroEmpleado).then(
      (success) => {
        this.dataEmpleados = success;
      }
    );
  }

  filtrarRecursosPorEmpleado(idEmpleado: string) {
    this.dataRecursos = [];
    this.asignacionService.filtrarRecursosPorEmpleado(idEmpleado).then(
      (success) => {
        this.dataRecursos = success.map((m: Recurso) => {
          if(m.asignadoA == idEmpleado) {
            m.isSeleccionado = true;
          }
          return m;
        });
      }
    );
  }

  isEmpleadoSeleccionado(): boolean {
    return !!this.dataEmpleados.find(f => f.isSeleccionado);
  }

  actualizar(): void {
    const empleado = this.dataEmpleados.find(f=>f.isSeleccionado)
    if(empleado) {
      const recursos = this.dataRecursos.filter(f => {
        if(f.asignadoA === empleado._id && !f.isSeleccionado) {
          f.asignadoA = null;
          return true;
        } else if(f.isSeleccionado && f.asignadoA !== empleado._id) {
          f.asignadoA = empleado._id;
          return true;
        }
        return false;
      });
      this.asignacionService.actualizarEmpleado(recursos).then(
        (success) => {
          alert('Actualziación exitosa. Se notifica a bodega')
          this.ngOnInit();
        }, (error) => {
          alert('Hubo un error')
        }
      );
    }
  }

  isRecursoAsignado(recurso: Recurso): boolean {
    return recurso.asignadoA !== null && recurso.asignadoA !== undefined
     && recurso.asignadoA !== '' && recurso.asignadoA !== this.dataEmpleados.find(f => f.isSeleccionado)?._id
  }

}
