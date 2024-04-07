import { Component } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';
import { RecursoService } from 'src/app/services/recurso.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent {
  solicitudes: Solicitud[] = [];
  solicitudesPendientes: Solicitud[] = [];
  solicitudesAprobadas: Solicitud[] = [];
  solicitudesRechazadas: Solicitud[] = [];
  mostrarPendientes: boolean = false;
  mostrarAprobadas: boolean = false;
  mostrarRechazadas: boolean = false;
  mostrarDiv(opcion: string) {
    if (opcion === 'Pendientes') {
      this.mostrarPendientes = true;
      this.mostrarAprobadas = false;
      this.mostrarRechazadas = false;
    } else if (opcion === 'Aprobadas') {
      this.mostrarPendientes = false;
      this.mostrarAprobadas = true;
      this.mostrarRechazadas = false;
    } else if (opcion === 'Rechazadas') {
      this.mostrarPendientes = false;
      this.mostrarAprobadas = false;
      this.mostrarRechazadas = true;
    }
  }
  


  constructor(private _recursoService: RecursoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerSolicitudes();
  }

  obtenerSolicitudes() {
    this._recursoService.obtenerSolicitudes().subscribe(data => {
      this.solicitudes = data; // Asigna directamente los datos recibidos
    }, error => {
      console.log(error);
    });
  }
  
  aprobarSolicitud(solicitud: Solicitud) {
    this._recursoService.aprobarSolicitud(solicitud).subscribe(
      (response) => {
        this.solicitudesPendientes = this.solicitudesPendientes.filter(s => s._id !== solicitud._id);
        this.solicitudesAprobadas.push(solicitud);
        this.mostrarDiv('Aceptadas');
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "Aprobada",
          text: "Solicitud aprobada con éxito",
        });
      },
      (error) => {
        console.error(error);
        Swal.fire({
          icon: "question",
          title: "Error...",
          text: "Hubo un error en el servidor.",
        });
      }
    );
  }

  rechazarSolicitud(solicitud: Solicitud) {
    this._recursoService.rechazarSolicitud(solicitud).subscribe(
      (response) => {
        this.solicitudesPendientes = this.solicitudesPendientes.filter(s => s._id !== solicitud._id);
        this.solicitudesRechazadas.push(solicitud);
        this.mostrarDiv('Rechazadas');
        console.log('Solicitud rechazada con éxito:', response);
        Swal.fire({
          icon: "error",
          title: "Rechazada",
          text: "Solicitud rechazada con éxito",
        });
      },
      (error) => {
        console.error('Error al rechazar la solicitud:', error);
        Swal.fire({
          icon: "question",
          title: "Error...",
          text: "Parece ser que hubo un error en el servidor",
        });
      }
    );
  }
  }
