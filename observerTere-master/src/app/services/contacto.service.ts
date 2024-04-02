import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contacto } from '../models/contacto';


@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  url = 'http://localhost:4000/api/contacto/';


  constructor(private http: HttpClient) { }

  enviarCorreo(contacto : Contacto): Observable<any>{
    return this.http.post(this.url, contacto);
  }

}
