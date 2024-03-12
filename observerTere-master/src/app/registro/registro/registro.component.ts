import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  empleadoForm: FormGroup;
  titulo = 'Registrar empleado'
  id: string | null;
  departamentos: { nombre: string}[] = []; // Ajusta el tipo según la estructura real de tus objetos de departamento
  gerents: { gerente: string}[] = []; // Ajusta el tipo según la estructura real de tus objetos de departamento
  

  constructor(private fb: FormBuilder,
    private router: Router,
    private _empleadoService: EmpleadoService,
    private aRouter: ActivatedRoute){
    
      this.empleadoForm = this.fb.group ({
      nombre: ['', Validators.required],
      aPaterno: ['', Validators.required],
      aMaterno: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{10,12}')]],
      email: ['', Validators.required],
      departamento: ['', Validators.required],
      gerente: ['', Validators.required], 
      puesto:['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id')
}



  ngOnInit(): void {
    this.esEditar();
    this.loadDepartments();
    this.loadGerents();
  }


  loadDepartments() {
    this._empleadoService.obtenerDepartamento().subscribe(
      (departamentos: { nombre: string }[]) => {
        // Actualiza las opciones de departamento en el formulario
        this.departamentos = departamentos;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadGerents() {
    this._empleadoService.obtenerGerente().subscribe(
      (gerents: { gerente: string }[]) => {
        // Actualiza las opciones de departamento en el formulario
        this.gerents = gerents;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  crearEmpleado(){
    const EMPLEADO: Empleado = {
      nombre: this.empleadoForm.get('nombre')?.value,
      aPaterno: this.empleadoForm.get('aPaterno')?.value,
      aMaterno: this.empleadoForm.get('aMaterno')?.value,
      telefono: this.empleadoForm.get('telefono')?.value,
      email: this.empleadoForm.get('email')?.value,
      departamento: this.empleadoForm.get('departamento')?.value,
      gerente: this.empleadoForm.get('gerente')?.value,
      puesto: this.empleadoForm.get('puesto')?.value,
      estado: '',
      ciudad: '',
    }
    console.log(EMPLEADO);
    if('Editar Empleado' === this.titulo) {
      if(this.id != null) {
        this._empleadoService.actualizarEmpleado(this.id, EMPLEADO).subscribe(data =>{
          alert('Empleado actualizado con exito!');
          this.router.navigate(['/listar-empleado'])
          this.empleadoForm.reset();
        }, error => {
          alert(error);
        })
      }
    } else {
      this._empleadoService.crearEmpleado(EMPLEADO).subscribe(data =>{
        alert('Empleado agregado con exito!');
        this.router.navigate(['/listar-empleado'])
      }, error => {
        this.empleadoForm.reset();
        alert(error);
      })
    }
  }
  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar Empleado';
      this._empleadoService.obtenerEmpleado(this.id).subscribe(data => {
        this.empleadoForm.setValue({
          nombre: data.nombre,
          aPaterno: data.aPaterno,
          aMaterno: data.aMaterno,          
          telefono: data.telefono,
          email: data.email,
          departamento: data.departamento,
          gerente: data.gerente,
          puesto: data.puesto
        })
      })
    }
  }
}