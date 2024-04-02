import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPorPalabraClavePipe'
})
export class FiltroPorPalabraClavePipePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (!arg || arg.length < 3) return value;
    const resultado = value.filter((elemento: any) => {
      return elemento.nombre.toLowerCase().includes(arg.toLowerCase()) ||
             elemento.descripcion.toLowerCase().includes(arg.toLowerCase());
    });
    return resultado;
  }
}
