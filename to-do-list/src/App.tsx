import { useEffect, useState } from "react";
import "./App.css";
import Tabla from "./components/Tabla";
import PopUp from "./components/PopUp";
import { Toolbar } from "./components/Toolbar";
import type { Tarea } from "./types/tareas";

const pesosPrioridad = {
  Alta: 1,
  Media: 2,
  Baja: 3,
};

// const lista_tareas: Tarea[] = [
//   { id: 1, titulo: "Configurar repositorio", prioridad: "Alta", estado: "Terminado", completa: true },
//   { id: 2, titulo: "Diseñar base de datos", prioridad: "Alta", estado: "Terminado", completa: true },
//   { id: 3, titulo: "Crear componentes UI", prioridad: "Media", estado: "Pendiente", completa: false },
//   { id: 4, titulo: "Integrar API de pagos", prioridad: "Alta", estado: "Pendiente", completa: false },
//   { id: 5, titulo: "Revisar pull requests", prioridad: "Media", estado: "Pendiente", completa: false },
//   { id: 6, titulo: "Actualizar documentación", prioridad: "Baja", estado: "Terminado", completa: true },
//   { id: 7, titulo: "Corregir bug de login", prioridad: "Alta", estado: "Pendiente", completa: false },
//   { id: 8, titulo: "Optimizar imágenes", prioridad: "Baja", estado: "Pendiente", completa: false },
//   { id: 9, titulo: "Configurar tests unitarios", prioridad: "Media", estado: "Terminado", completa: true },
//   { id: 10, titulo: "Reunión de sprint", prioridad: "Media", estado: "Terminado", completa: true },
//   { id: 11, titulo: "Implementar dark mode", prioridad: "Baja", estado: "Pendiente", completa: false },
//   { id: 12, titulo: "Desplegar a staging", prioridad: "Alta", estado: "Pendiente", completa: false },
//   { id: 13, titulo: "Limpiar logs de consola", prioridad: "Baja", estado: "Terminado", completa: true },
//   { id: 14, titulo: "Investigar microservicios", prioridad: "Media", estado: "Pendiente", completa: false },
//   { id: 15, titulo: "Ajustar estilos CSS", prioridad: "Baja", estado: "Pendiente", completa: false },
//   { id: 16, titulo: "Configurar CI/CD", prioridad: "Alta", estado: "Pendiente", completa: false },
//   { id: 17, titulo: "Validar formularios", prioridad: "Media", estado: "Terminado", completa: true },
//   { id: 18, titulo: "Entrevista técnica", prioridad: "Alta", estado: "Terminado", completa: true },
//   { id: 19, titulo: "Actualizar dependencias", prioridad: "Baja", estado: "Pendiente", completa: false },
//   { id: 20, titulo: "Backup de producción", prioridad: "Alta", estado: "Terminado", completa: true },
// ];

function App() {
  function getLocalStorageData() {
    const localStorageTareas = localStorage.getItem("localStorageTareas");
    const tareas = localStorageTareas ? (JSON.parse(localStorageTareas) as Tarea[]) : [];
    return tareas;
  }

  const [tareas, setTareas] = useState<Tarea[]>(() => {
    const ret = getLocalStorageData();
    return ret;
  });
  const [tareasFiltradas, setTareasFiltradas] = useState<Tarea[]>(() => {
    const ret = getLocalStorageData();
    return ret;
  });

  const [mostrarPopUp, setMostrarPopUp] = useState<boolean>(false);
  const [textoIngresado, setTextoIngresado] = useState("");
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("Todos");

  useEffect(() => {
    // console.log("useEffect tareas -> ", tareas)
    localStorage.setItem("localStorageTareas", JSON.stringify(tareas));
  }, [tareas]);

  function onOrdenarPrioridad() {
    tareasFiltradas.sort((a: Tarea, b: Tarea) => {
      const prioridadA = pesosPrioridad[a.prioridad];
      const prioridadB = pesosPrioridad[b.prioridad];
      return prioridadA - prioridadB;
    });
    setTareasFiltradas([...tareasFiltradas]);
  }

  function mostrarTareaCompletada(tareaId: number) {
    const tareaEncontrada = tareas.find((fila) => {
      return fila.id === tareaId;
    });
    if (tareaEncontrada) {
      tareaEncontrada.completa = !tareaEncontrada.completa;
      if (tareaEncontrada.completa) {
        tareaEncontrada.estado = "Terminado";
      } else {
        tareaEncontrada.estado = "Pendiente";
      }
    }
    const nuevasTareas = [...tareas];
    setTareas(nuevasTareas);
    filtrar(nuevasTareas);
  }

  async function onAgregarTarea(nuevaTarea: Tarea) {
    const nuevasTareas = [...tareas, nuevaTarea];
    setTareas(nuevasTareas);
    filtrar(nuevasTareas);
    setMostrarPopUp(false);
    // const localStorageTareas = localStorage.getItem('localStorageTareas');
  }

  function filtrarPorNombre(listaTareas: Tarea[]) {
    if (textoIngresado !== "") {
      const filtroPorNombre = listaTareas.filter((tarea) => {
        if (tarea.titulo.includes(textoIngresado)) {
          return true;
        } else {
          return false;
        }
      });
      setTareasFiltradas(filtroPorNombre);
    } else {
      setTareasFiltradas(listaTareas);
    }
  }

  function filtrar(tareas: Tarea[]) {
    console.log("tareas.length -> ", tareas.length);
    if (estadoSeleccionado === "Todos") {
      filtrarPorNombre(tareas);
    } else {
      const filtroPorEstado = tareas.filter((tarea) => {
        if (tarea.estado === estadoSeleccionado) {
          return true;
        } else return false;
      });

      filtrarPorNombre(filtroPorEstado);
    }
  }

  return (
    <div>
      <section id="center">
        <div>
          <h1>Gestor de tareas</h1>
        </div>
      </section>

      <section className="navegacion"></section>

      {/* TOOLBAR */}
      <section>
        <Toolbar
          setMostrarPopUp={setMostrarPopUp}
          onOrdenarPrioridad={onOrdenarPrioridad}
          setEstadoSeleccionado={setEstadoSeleccionado}
          setTextoIngresado={setTextoIngresado}
          onFiltrar={() => {
            filtrar(tareas);
          }}
          estadoSeleccionado={estadoSeleccionado}
          textoIngresado={textoIngresado}
        />
      </section>

      {/* TABLA */}
      <section id="center">
        <Tabla tareas={tareasFiltradas} marcarTareaCompletada={mostrarTareaCompletada} />
      </section>

      {mostrarPopUp === true ? (
        // POPUP
        <section>
          <PopUp onAgregarTarea={onAgregarTarea} setMostrarPopUp={setMostrarPopUp} />
        </section>
      ) : null}
    </div>
  );
}

export default App;
