export class Contacto {
    _id?: number;
    asunto: string;
    nombre: string;
    correo: string;
    descripcion: string;


    constructor(asunto: string, nombre: string, correo: string, descripcion: string){
        this.nombre = nombre;
        this.asunto = asunto;
        this.correo = correo;
        this.descripcion = descripcion;
    }
}