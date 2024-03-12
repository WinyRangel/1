import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AsignacionService, Empleado, Recurso } from '../asignacion.service';

@Component({
  selector: 'app-busqueda-por-recurso',
  templateUrl: './busqueda-por-recurso.component.html',
  styleUrls: ['./busqueda-por-recurso.component.css'],
  providers: [AsignacionService]
})
export class BusquedaPorRecursoComponent implements OnInit {

  dataEmpleados: Empleado[];
  dataRecursos: Recurso[];

  filtroEmpleado: FormGroup;
  filtroRecurso: FormGroup;
  recursoFallido: Recurso|null;

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
    this.recursoFallido = null;
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

  filtrarRecursos(filtroRecurso: Recurso) {
    this.dataRecursos = [];
    this.asignacionService.getRecursos(filtroRecurso).then(
      (success) => {
        this.dataRecursos = success;
      }
    );
  }

  eventRecurso(evento: any, recurso: Recurso) {
    this.dataEmpleados = [];
    if(evento.target.checked) {
      this.dataRecursos.forEach(e => {
        e.isSeleccionado = false;
      })
    }
    recurso.isSeleccionado = evento.target.checked;
    const idEmpleado:string|null = recurso.asignadoA||null;
    const empleado: Empleado = {
      _id: '',
      aMaterno: '',
      aPaterno: '',
      idEmpleado: null,
      nombre: ''
    }
    this.filtrarEmpleados(empleado, idEmpleado);

  }

  eventEmpleado(evento:any, empleado: Empleado) {
    if(evento.target.checked) {
      this.dataEmpleados.forEach(e => {
        e.isSeleccionado = false;
      })
    }
    empleado.isSeleccionado = evento.target.checked;
  }

  filtrarEmpleados(filtroEmpleado: Empleado, idEmpleado: string|null) {
    this.dataEmpleados = [];
    this.asignacionService.getEmpleados(filtroEmpleado).then(
      (success) => {
        this.dataEmpleados = success.map((m: Empleado) => {
          if(m._id == idEmpleado) {
            m.isSeleccionado = true;
          }
          return m;
        });
      }
    );
  }

  asignarRecursos(): void {
    if(!this.dataRecursos.find(f => f.isSeleccionado)){
      alert('Se debe de seleccionar al menos un recurso')
    } else {
      let empleado = this.dataEmpleados.find(f=> f.isSeleccionado);
      if(empleado === undefined) {
        empleado = {
          _id: '',
          idEmpleado: null,
          aMaterno: '',
          aPaterno: '',
          nombre: ''
        }
      }
      if(empleado) {
        this.asignacionService.asignarRecursoAEmpleado(empleado, this.dataRecursos.filter(f => f.isSeleccionado)).then(
          (success) => {
            alert('Actualziación exitosa. Se notifica a bodega')
            this.dataEmpleados = [];
            this.dataRecursos = [];
          }, (error) => {
            console.error(error)
          }
        )
      }
    }
  }

  isEmpleadoSeleccionado(): boolean {
    return !!this.dataEmpleados.find(f => f.isSeleccionado);
  }

  isRecursosSeleccionados(): boolean  {
    return !!this.dataRecursos.find(f => f.isSeleccionado);
  }

  reportarFalla(valor: any) {
    if(valor) {
      this.ngOnInit();
    }
  }

}
