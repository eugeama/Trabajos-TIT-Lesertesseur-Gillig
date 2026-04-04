import type { tarea, Prioridad } from "./TareaInterface";

let tareas: tarea[] = [];

export function crearTarea(
    idTarea: number,
    nombreTarea: string,
    fechaCreada: string,
    fechaFinalizacion: string,
    prioridad: Prioridad,
    estado: string
): tarea {
    const nuevaTarea: tarea = { idTarea, nombreTarea, fechaCreada, fechaFinalizacion, prioridad, estado };
    return nuevaTarea;
}

export function mostrarTarea(tarea: tarea): string {
    return `
    ID: ${tarea.idTarea},
    nombre: ${tarea.nombreTarea},
    fechaCreacion: ${tarea.fechaCreada},
    fechaFinalizacion: ${tarea.fechaFinalizacion},
    prioridad: ${tarea.prioridad},
    estado: ${tarea.estado}`;
}

export function duplicarTarea(id: number, tareaVieja: tarea): tarea {
    const nueva: tarea = crearTarea(
        id,
        tareaVieja.nombreTarea + " (copia)",
        tareaVieja.fechaCreada,
        tareaVieja.fechaFinalizacion as string,
        tareaVieja.prioridad,
        tareaVieja.estado
    );
    return nueva;
}

export function agregarTarea(tarea: tarea): tarea[] {
    tareas = [...tareas, tarea];
    return tareas;
}
 
export function eliminarTarea(id: number): tarea[] {
    tareas = tareas.filter(t => t.idTarea !== id);
    return tareas;
}

export function actualizarTarea(tareaActualizar: Partial<tarea> & { idTarea: number }): tarea[] {
    tareas = tareas.map(t =>
        t.idTarea === tareaActualizar.idTarea
            ? { ...t, ...tareaActualizar }
            : t
    );
    return tareas;
}

export function actualizarPrioridad(id: number, prioridad: Prioridad): tarea[] {
    tareas = tareas.map(t =>
        t.idTarea === id
            ? { ...t, prioridad }
            : t
    );
    return tareas;
}

export function completarTarea(tarea: tarea): tarea[] {
    tareas = tareas.map(t =>
        t.idTarea === tarea.idTarea
            ? { ...t, fechaFinalizacion: new Date() }
            : t
    );
    return tareas;
}

export function buscarPorId(id: number): tarea | undefined {
    return tareas.find(t => t.idTarea === id);
}

export function filtrarPorEstado(estado: string): tarea[] {
    return tareas.filter(t => t.estado === estado);
}

export function filtrarPorPrioridad(prioridad: Prioridad): tarea[] {
    return tareas.filter(t => t.prioridad === prioridad);
}
 
export function contarPorPrioridad(): { alta: number; media: number; baja: number } {
    const alta  = tareas.reduce((c, t) => t.prioridad === "alta"  ? c + 1 : c, 0);
    const media = tareas.reduce((c, t) => t.prioridad === "media" ? c + 1 : c, 0);
    const baja  = tareas.reduce((c, t) => t.prioridad === "baja"  ? c + 1 : c, 0);
    return { alta, media, baja };
}
 
export function ordenarPorPrioridad(): tarea[] {
    const prioridades: Record<Prioridad, number> = { alta: 1, media: 2, baja: 3 };
    return [...tareas].sort((a, b) => prioridades[a.prioridad] - prioridades[b.prioridad]);
}

export function buscarTareas(palabra: string): tarea[] {
    return tareas.filter(t => t.nombreTarea.toLowerCase().includes(palabra.toLowerCase()));
}
 
interface ResultadoValidacion {
    esValido: boolean;
    errores: string[];
}
 
export function validarTarea(tarea: Partial<tarea>): ResultadoValidacion {
    const errores: string[] = [];
 
    if (!tarea.idTarea)        errores.push("Falta idTarea");
    if (!tarea.nombreTarea)    errores.push("Falta nombreTarea");
    if (!tarea.fechaCreada)    errores.push("Falta fechaCreada");
    if (!tarea.prioridad)      errores.push("Falta prioridad");
    if (!tarea.estado)         errores.push("Falta estado");
 
    return errores.length > 0
        ? { esValido: false, errores }
        : { esValido: true,  errores: [] };
}