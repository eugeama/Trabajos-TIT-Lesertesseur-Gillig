export interface tarea{
    idTarea:number;
    nombre:string;
    fechaCreada:Date;
    fechaFinalizacion:Date;
    prioridad: "baja" | "media" | "alta";
    estado:string;
}