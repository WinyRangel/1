export class Solicitud {
    _id?: number;
    nombre: string;
    recurso: string;
    estado: string;
    comentario: string;

    constructor(nombre: string, recurso: string, comentario: string, estado: string, _id: string) {
        this.nombre = nombre;
        this.recurso = recurso;
        this.comentario = comentario;
        this.estado = estado;
    }

}
