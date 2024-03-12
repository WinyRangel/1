import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { AsignacionService, Recurso } from '../asignacion.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-falla',
  templateUrl: './modal-falla.component.html',
  styleUrls: ['./modal-falla.component.css'],
  providers: [AsignacionService]
})
export class ModalFallaComponent implements OnChanges {

  @Input() recurso: Recurso|null;
  @Output() reportarFalla = new EventEmitter<boolean>();
  formFalla: FormGroup;

  constructor(private service: AsignacionService, private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.recurso = null;
    this.formFalla = formBuilder.group({
      fchDesde: [new Date()],
      numSerie: [null],
      descripcion: []
    })
  }

  ngOnChanges(): void {
    this.formFalla = this.formBuilder.group({
      fchDesde: [this.datePipe.transform(new Date(), 'YYYY-MM-dd')],
      numSerie: [this.recurso?.numSerie],
      descripcion: ['']
    })
  }

  guardar(): void {
    console.info('Reporte de falla')
    console.info(this.formFalla.value)
    this.service.guardarFalla(this.formFalla.value).then(
      (success) => {
        document.getElementById('btnCancelar')?.click()
        this.reportarFalla.emit(true);
      }, (error) => {
        console.info(error)
        alert('Ocurrio un error')
      }
    );
  }

}
