import { Recurso } from './../models/recurso';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    
    if (arg === '' || arg.length < 3) return value;
    const resultRecurso = [];
    for (const vrecurso of value) {
      if (vrecurso.numSerie.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultRecurso.push(vrecurso);
      } else if (vrecurso.recurso.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultRecurso.push(vrecurso);
      } else if (vrecurso.marca.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultRecurso.push(vrecurso);
      } else if (vrecurso.modelo.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultRecurso.push(vrecurso);
      } 
    };
    return resultRecurso;
  }

}
