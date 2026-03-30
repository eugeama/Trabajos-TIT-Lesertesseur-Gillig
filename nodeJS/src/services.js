function agregarTarea(tarea){
    tareas= [...tareas, tarea];
    return tareas;
}

function eliminarTarea(id){
    tareas = tareas.filter(t => t.idTarea !== id);
    return tareas;
}

function actualizarTarea(tareaActualizar){
    const tareaActualizada = 
    tareas.map(t => tareaActualizar.id === t.id) ?
    {...t, ...tareaActualizar} : t;
    
    tareas = tareaActualizada;
    return tareas;
}

function actualizarPrioridad(id, prioridad){
        const tareaActualizada = tareas.map(t => 
        t.idTarea === id
            ? {...t, prioridad: prioridad} 
            : t
    );
    
    tareas = tareaActualizada;
    return tareas;
}

function completarTarea(tarea){
    const tareaActualizada = tareas.map(t => 
        t.idTarea === tarea.idTarea 
            ? {...t, fechaFinalizacion: new Date()} 
            : t
    );
    
    tareas = tareaActualizada;
    return tareas;
}