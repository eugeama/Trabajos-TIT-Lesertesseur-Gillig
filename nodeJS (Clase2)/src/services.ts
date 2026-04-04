import type { tarea, Prioridad } from "./TareaInterface";

let tareas: tarea[] = [];

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