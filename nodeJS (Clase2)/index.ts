import { tarea } from "./TareaInterface"
import { crearTarea, mostrarTarea, duplicarTarea } from "./src/models"
import { agregarTarea, eliminarTarea, actualizarTarea, actualizarPrioridad, completarTarea } from "./src/models"
import {  }


let tareas: tarea[] = [];

const tarea1= crearTarea(1, "sillytareas", '2025-02-03', '2025-05-02', "alta", "laburando");
const tarea2= crearTarea(2, "sillitos", '2025-02-05', '2025-07-02', "media", "casi terminado");
const tarea3= crearTarea(3, "silicatos", '2025-03-04', '2025-12-02', "baja", "casi terminado");
const tarea4= crearTarea(4, "sillytarea2", '2025-08-23', '2026-02-03', "alta", "laburando");

