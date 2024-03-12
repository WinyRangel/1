import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Recurso } from 'src/app/models/recurso';
import { RecursoService } from 'src/app/services/recurso.service';

@Component({
  selector: 'app-eliminar-recurso',
  templateUrl: './eliminar-recurso.component.html',
  styleUrls: ['./eliminar-recurso.component.css']
})
export class EliminarRecursoComponent {
  recursoForm: FormGroup;
  titulo = 'Crear recurso';
  id: string | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _recursoService: RecursoService,
    private aRouter: ActivatedRoute
    ) {
    this.recursoForm = this.fb.group({
      numSerie: ['',],
      recurso: ['',],
      marca: ['',],
      gama: ['',],
      estatus: ['', ],
      })
      this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarRecurso(): void {
    console.log(this.recursoForm)

    console.log(this.recursoForm.get('numSerie')?.value);
    const valorPorDefectoEstatus = 'Con Problemas';
    const RECURSO: Recurso = {
      numSerie: this.recursoForm.get('numSerie')?.value,
      recurso: this.recursoForm.get('recurso')?.value,
      marca: this.recursoForm.get('marca')?.value,
      gama: this.recursoForm.get('gama')?.value,
      estatus: valorPorDefectoEstatus,
      asignadoA: ''
    }

    if(this.id !== null){
      //editar recurso;
    this._recursoService.editarRecurso(this.id, RECURSO).subscribe(data => {
      this.toastr.info('El recurso eliminado logicamente con éxito', 'Recurso Borrado');
      this.router.navigate(['/listar-recurso']);
    }, error => {
      console.log(error);
      this.recursoForm.reset();
    })
    }else{
      //agregar recurso
      console.log(RECURSO);
      this._recursoService.guardarRecurso(RECURSO).subscribe(data => {
        this.toastr.success('El recurso fue registrado con éxito', 'Recurso Actualizado');
        this.router.navigate(['/listar-recurso']);
      }, error => {
        console.log(error);
        this.recursoForm.reset();
      })
    }

  }

  esEditar() {

    if(this.id !== null) {
      this.titulo = 'Editar Recurso';
      this._recursoService.obtenerRecurso(this.id).subscribe(data => {
        this.recursoForm.setValue({
          numSerie: data.numSerie,
          recurso: data.recurso,
          marca: data.marca,
          gama: data.gama,
          estatus: data.estatus,
        })
      })
    }
  }

}
