import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Recurso } from 'src/app/models/recurso';
import { Solicitud } from 'src/app/models/solicitud';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { RecursoService } from 'src/app/services/recurso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  solicitudForm: FormGroup;
  listRecursos: Recurso[] = [];
  empleados: {nombre: string}[] = []
  filterPost = '';
  id: string | null;
  filter: string = '';

  constructor(private fb: FormBuilder,private _recursoService: RecursoService, private toastr: ToastrService, private _empleadoService: EmpleadoService, private aRouter:ActivatedRoute, private router: Router) {
    
    this.solicitudForm = this.fb.group ({
      nombre: ['', Validators.required],
      recurso: ['', Validators.required],
      comentario: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }
  ngOnInit(): void {
    this.obtenerRecursos();
    this.loadEmpleados();
  }

  loadEmpleados() {
    this._empleadoService.getEmpleados().subscribe(
      (empleados: { nombre: string }[]) => {
        this.empleados = empleados;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerRecursos() {
    this._recursoService.getRecursos().subscribe(data => {
      console.log(data);
      this.listRecursos = data;
    }, error => {
      console.log(error);
    })
  }
  solicitarRecurso(){
    const SOLICITUD: Solicitud = {
      nombre: this.solicitudForm.get('nombre')?.value,
      recurso: this.solicitudForm.get('recurso')?.value,
      estado: 'En revisión', // Estado inicial
      comentario: this.solicitudForm.get('comentario')?.value,
    }
    this._recursoService.solicitarRecurso(SOLICITUD).subscribe(
      (response) => {
        // Manejar la respuesta exitosa
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "Tu solicitud ha sido enviada con éxito, revisaremos tu solicitud",
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        // Manejar el error
        console.error(error);
        this.toastr.error('Hubo un error al enviar la solicitud');
      }
    );
  }
}
