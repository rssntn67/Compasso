export class Operazione {
    cantiereId:string;
    operabileId:string;
    tipo:string;

    constructor(cantiereId:string, operabileId:string,tipo:string) {
        this.cantiereId=cantiereId;
        this.operabileId=operabileId;
        this.tipo=tipo;
    }

}
