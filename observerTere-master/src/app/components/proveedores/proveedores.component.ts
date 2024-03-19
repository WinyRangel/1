import { Component } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {
  listProveedores: Proveedor [] = [];
  filterProveedor = '';
  

  constructor(private proveedorService: ProveedorService) { }

  ngOnInit(): void {
    this.obtenerProveedor();
  }

  obtenerProveedor() {
    this.proveedorService.getProveedores().subscribe(data => {
      console.log(data);
      this.listProveedores = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarProveedor(id: any) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este proveedor?');
  
    if (confirmacion) {
      this.proveedorService.eliminarProveedor(id).subscribe(
        data => {
          alert('Proveedor Eliminado');
          this.obtenerProveedor();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
