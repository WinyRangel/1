import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proveedorfilter'
})
export class ProveedorfilterPipe implements PipeTransform {

  transform(value: any, arg:any): any {
    if(arg == '' || arg.length < 1) return value;
    const resultProveedor = [];
    for (const pnombre of value){
      if(pnombre.nombre.toLowerCase().indexOf(arg.toLowerCase()) > - 1){
        resultProveedor.push(pnombre);
      }else if(pnombre.direccion.toLowerCase().indexOf(arg.toLowerCase()) > - 1){
        resultProveedor.push(pnombre);
      }else if(pnombre.email.toLowerCase().indexOf(arg.toLowerCase()) > - 1){
        resultProveedor.push(pnombre);
      }else if(pnombre.telefono.toLowerCase().indexOf(arg.toLowerCase()) > - 1){
        resultProveedor.push(pnombre);
    } 
  };
  return resultProveedor;
}

}
