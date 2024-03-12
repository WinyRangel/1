export class Empleado {
    _id?: number;
    nombre: string;
    aPaterno: string;
    aMaterno: string;
    telefono: string;
    email: string;
    estado: string;
    ciudad: string;
    departamento:string;
    puesto: string;
    gerente: string;

    constructor(nombre: string, aPaterno: string, aMaterno: string, estado: string, ciudad: string, departamento:string, puesto: string,gerente: string, email: string, telefono: string){
        this.nombre = nombre;
        this.aPaterno = aPaterno;
        this.aMaterno = aMaterno;
        this.email = email;
        this.telefono = telefono;
        this.estado = estado;
        this.ciudad = ciudad;
        this.departamento = departamento;
        this.gerente = gerente;
        this.puesto = puesto;
    }
}