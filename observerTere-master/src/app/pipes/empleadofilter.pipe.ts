import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empleadofilter'
})
export class EmpleadofilterPipe implements PipeTransform {

  
  transform(value: any, arg:any): any {
    if(arg == '' || arg.length < 1) return value;
    const resultEmpleado = [];
    for (const enombre of value){
      if(enombre.nombre.toLowerCase().indexOf(arg.toLowerCase()) > - 1){
        resultEmpleado.push(enombre);
      }else if(enombre.aPaterno.toLowerCase().indexOf(arg.toLowerCase()) > - 1){
        resultEmpleado.push(enombre);
      }else if(enombre.aMaterno.toLowerCase().indexOf(arg.toLowerCase()) > - 1){
        resultEmpleado.push(enombre);
      }else if(enombre.telefono.toLowerCase().indexOf(arg.toLowerCase()) > - 1){
        resultEmpleado.push(enombre);
      }else if(enombre.email.toLowerCase().indexOf(arg.toLowerCase()) > - 1){
        resultEmpleado.push(enombre);
      }else if(enombre.departamento.toLowerCase().indexOf(arg.toLowerCase()) > - 1){
        resultEmpleado.push(enombre);
    } 
  };
  return resultEmpleado;
}

}
