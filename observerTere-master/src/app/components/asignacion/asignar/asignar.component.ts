import { Component, OnInit } from '@angular/core';
import { AsignacionService, Empleado, Recurso } from '../asignacion.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.css'],
  providers: [AsignacionService]
})
export class AsignarComponent implements OnInit {

  dataEmpleados: Empleado[];
  dataRecursos: Recurso[];

  filtroEmpleado: FormGroup;
  filtroRecurso: FormGroup;

  constructor(private formBuilder: FormBuilder, private asignacionService: AsignacionService) {
    this.filtroEmpleado = formBuilder.group({
      idEmpleado: [null],
      nombre: [''],
      aPaterno: [''],
      aMaterno: ['']
    });
    this.filtroRecurso = formBuilder.group({
      numSerie: [''],
      recurso: [''],
      marca: [''],
      modelo: ['']
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
    this.filtroRecurso = this.formBuilder.group({
      numSerie: [''],
      recurso: [''],
      marca: [''],
      modelo: ['']
    });
    this.dataEmpleados = [];
    this.dataRecursos = [];
  }

  asignarRecursos(): void {
    if(!this.dataEmpleados.find(f => f.isSeleccionado)) {
      alert('Se debe de seleccionar un empleado')
    } else if(!this.dataRecursos.find(f => f.isSeleccionado)){
      alert('Se debe de seleccionar al menos un recurso')
    } else {
      const empleado = this.dataEmpleados.find(f=> f.isSeleccionado);
      if(empleado) {
        this.asignacionService.asignarRecursoAEmpleado(empleado, this.dataRecursos.filter(f => f.isSeleccionado)).then(
          (success) => {
            alert(success.mensaje)
            this.ngOnInit();
          }, (error) => {
            console.error(error)
          }
        )
      }
    }
  }

  event(evento: any, recurso: Recurso) {
    recurso.isSeleccionado = evento.target.checked;
  }

  eventEmpleado(evento:any, empleado: Empleado) {
    if(evento.target.checked) {
      this.dataEmpleados.forEach(e => {
        e.isSeleccionado = false;
      })
    }
    empleado.isSeleccionado = evento.target.checked;
  }

  filtrarEmpleados(filtroEmpleado: Empleado) {
    this.dataEmpleados = [];
    this.asignacionService.getEmpleados(filtroEmpleado).then(
      (success) => {
        this.dataEmpleados = success;
      }
    );
  }

  filtrarRecursos(filtroRecurso: Recurso) {
    this.dataRecursos = [];
    this.asignacionService.getRecursos(filtroRecurso).then(
      (success) => {
        this.dataRecursos = success;
      }
    );
  }

  isEmpleadoSeleccionado(): boolean {
    return !!this.dataEmpleados.find(f => f.isSeleccionado);
  }

  isRecursosSeleccionados(): boolean  {
    return !!this.dataRecursos.find(f => f.isSeleccionado);
  }

}
