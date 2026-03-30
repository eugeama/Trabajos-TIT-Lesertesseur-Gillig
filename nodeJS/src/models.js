function crearTarea(idTarea, nombreTarea, fechaCreada, fechaFinalizacion, prioridad, estado){
    let tarea={idTarea, nombreTarea, fechaCreada, fechaFinalizacion, prioridad, estado};
    return tarea;
}

function mostrarTarea(tarea){
    const tareaMostrada= `
    ID: ${tarea.idTarea},
    nombre: ${tarea.nombreTarea},
    fechaCreacion: ${tarea.fechaCreada},
    fechaFinalizacion: ${tarea.fechaFinalizacion},
    prioridad: ${tarea.prioridad},
    estado: ${tarea.estado}`
    return tareaMostrada;
}

function duplicarTarea(id, tareaVieja){
    tareas.find(tareaVieja => tareaVieja.idTarea === tareas.idTarea)
    const nuevaTarea= tareaVieja.crearTarea(id, tareaVieja.nombreTarea+" (copia)", ...tareaVieja)
}