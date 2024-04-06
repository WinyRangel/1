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
  mostrarPendientes: boolean = false;
  mostrarAceptadas: boolean = false;
  mostrarRechazadas : boolean = false;

  mostrarDiv(opcion: string) {
      if (opcion === 'Pendientes') {
          this.mostrarPendientes = true;
          this.mostrarAceptadas = false;
          this.mostrarAceptadas = false;
      } else if (opcion === 'Aceptadas') {
          this.mostrarPendientes = false;
          this.mostrarRechazadas = false;
          this.mostrarAceptadas = true;
      } else if (opcion === 'Rechazadas'){
        this.mostrarPendientes = false;
        this.mostrarRechazadas = true;
        this.mostrarAceptadas = false;      
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
