export class Recurso{
    _id?: number;

    numSerie: string;
    recurso: String;
    marca: String;
    gama: String;
    estatus: string;
    asignadoA: string;


    constructor(numSerie: string, recurso: string, marca: string, gama: string, estatus: string, asignadoA: string ){

        this.numSerie = numSerie;
        this.recurso = recurso;
        this.marca = marca;
        this.gama = gama;
        this.estatus = estatus;
        this.asignadoA = asignadoA;
    }
}
