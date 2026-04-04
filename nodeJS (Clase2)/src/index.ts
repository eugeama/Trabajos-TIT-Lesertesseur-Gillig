import type { tarea } from "./TareaInterface";
import {
	crearTarea,
	mostrarTarea,
	duplicarTarea,
	agregarTarea,
	eliminarTarea,
	actualizarTarea,
	actualizarPrioridad,
	completarTarea,
} from "./models";

const tarea1: tarea = crearTarea(1, "sillytareas", "2025-02-03", "2025-05-02", "alta", "laburando");
const tarea2: tarea = crearTarea(2, "sillitos", "2025-02-05", "2025-07-02", "media", "casi terminado");
const tarea3: tarea = crearTarea(3, "silicatos", "2025-03-04", "2025-12-02", "baja", "casi terminado");
const tarea4: tarea = crearTarea(4, "sillytarea2", "2025-08-23", "2026-02-03", "alta", "laburando");

agregarTarea(tarea1);
agregarTarea(tarea2);
agregarTarea(tarea3);
agregarTarea(tarea4);

actualizarTarea({ idTarea: 2, estado: "finalizada" });
actualizarPrioridad(3, "media");
completarTarea(tarea1);

const copia = duplicarTarea(5, tarea4);
agregarTarea(copia);

eliminarTarea(4);

console.log(mostrarTarea(tarea1));
 