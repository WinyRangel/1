export class Proveedor {
    _id?: number;
    nombre: string;
    direccion: string;
    codigoC: string;
    codigoI: string;
    email: string;
    telefono: Number;

    constructor(nombre: string, direccion: string, codigoC: string, codigoI: string, ciudad: string, telefono:Number, email:string){
        this.nombre = nombre;
        this.direccion = direccion;
        this.codigoC = codigoC;
        this.email = email;
        this.codigoI = codigoI;
        this.telefono = telefono;

    }
}