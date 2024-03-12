import { Component } from '@angular/core';
import { AsignacionService } from './asignacion.service';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css'],
  providers: [AsignacionService]
})
export class AsignacionComponent {

  collapseEmpleado = false;

}
