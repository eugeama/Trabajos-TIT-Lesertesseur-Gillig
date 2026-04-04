export type Prioridad = "alta" | "media" | "baja";

export interface tarea {
    idTarea: number;
    nombreTarea: string;
    fechaCreada: string;
    fechaFinalizacion: string | Date;
    prioridad: Prioridad;
    estado: string;
}