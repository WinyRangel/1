import { Component, OnInit } from '@angular/core';
import { RecursoService } from './../../services/recurso.service';
import { ToastrService } from 'ngx-toastr';
import { Recurso } from 'src/app/models/recurso';

@Component({
  selector: 'app-listar-recurso',
  templateUrl: './listar-recurso.component.html',
  styleUrls: ['./listar-recurso.component.css']
})
export class ListarRecursoComponent implements OnInit{
    mostrarSinFallos: boolean = false;
    mostrarConFallos: boolean = false;

    mostrarDiv(opcion: string) {
        if (opcion === 'SinFallos') {
            this.mostrarSinFallos = true;
            this.mostrarConFallos = false;
        } else if (opcion === 'ConFallos') {
            this.mostrarSinFallos = false;
            this.mostrarConFallos = true;
        }
    }



  listRecursos: Recurso[] = [];

  filterPost = '';

  filter: string = '';

  constructor(private _recursoService: RecursoService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.obtenerRecursos();
    this.mostrarDiv('SinFallos');
  }

  obtenerRecursos() {
    this._recursoService.getRecursos().subscribe(data => {
      console.log(data);
      this.listRecursos = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarRecurso(id:any) {
    this._recursoService.eliminarRecurso(id).subscribe(data => {
      this.toastr.error('El recurso fue eliminado con exito');
      this.obtenerRecursos();
    }, error=> {
       console.log(error);
    } )
  }

  
 

}
