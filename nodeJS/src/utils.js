function buscarPorId(id){
    return tareas.find(tareas => tareas.idTarea === id)
}

function filtrarPorEstado(estado){
    const tareasFiltradas= tareas.filter(tareas.estado == estado);
    return tareasFiltradas;
}

function filtrarPorEstado(prioridad){
    const tareasFiltradas= tareas.filter(tareas.prioridad == prioridad);
    return tareasFiltradas;
}

function contarPorPrioridad(){
    let alta= tareas.reduce((contador, tarea) => {
        if(tarea.prioridad === "alta") contador++;
        return contador;
    }, 0);

    let media= tareas.reduce((contador, tarea) => {
        if(tarea.prioridad === "media") contador++;
        return contador;
    }, 0);

    let baja= tareas.reduce((contador, tarea) => {
        if(tarea.prioridad === "baja") contador++;
        return contador;
    }, 0);

    return { alta, media, baja };
}

function ordenarPorPrioridad(){
    const prioridades = { alta: 1, media: 2, baja: 3 };
    return [...tareas].sort((a, b) => prioridades[a.prioridad] - prioridades[b.prioridad]);
}

function buscarTareas(palabra){
    const tareasFiltradas= tareas.filter(t => t.nombreTarea.toLowerCase().includes(palabra.toLowerCase())) ? tareasFiltradas : [];
    return tareasFiltradas;
}

function validarTarea(tarea){
    const errores = [];
    
    if(!tarea.idTarea) errores.push("Falta idTarea");
    if(!tarea.nombreTarea) errores.push("Falta nombreTarea");
    if(!tarea.fechaCreada) errores.push("Falta fechaCreada");
    if(!tarea.prioridad) errores.push("Falta prioridad");
    if(!tarea.estado) errores.push("Falta estado");
    
    return errores.length > 0
        ? { esValido: false, errores }
        : { esValido: true, errores: [] };
}