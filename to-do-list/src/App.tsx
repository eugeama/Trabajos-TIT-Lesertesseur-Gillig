import { useState } from "react";
import "./App.css";
import Tabla from "./components/Tabla";
import PopUp from "./components/PopUp";
import { Toolbar } from "./components/Toolbar";

interface Tarea {
  titulo: string;
  id: number;
  prioridad: "Baja" | "Media" | "Alta";
  estado: "Pendiente" | "Terminado";
  completa: boolean;
}

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
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [tareasFiltradas, setTareasFiltradas] = useState<Tarea[]>([]);
  const [mostrarPopUp, setMostrarPopUp] = useState<boolean>(false);
  const [textoIngresado, setTextoIngresado] = useState("");
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("Todos");

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
    setTareas([...tareas]);
    filtrar();
  }

  async function onSubmit(formData: FormData) {
    const id = formData.get("id") as string;
    const titulo = formData.get("titulo") as string;
    const prioridad = formData.get("prioridad") as Tarea["prioridad"];
    const estado = formData.get("estado") as Tarea["estado"];

    const nuevaTarea: Tarea = {
      id: parseInt(id),
      titulo: titulo,
      prioridad: prioridad,
      estado: estado,
      completa: false,
    };

    setTareas([...tareas, nuevaTarea]);
    setMostrarPopUp(false);
    filtrar();
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

  function filtrar() {
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
          filtrar={filtrar}
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
          <PopUp onSubmit={onSubmit} setMostrarPopUp={setMostrarPopUp} />
        </section>
      ) : null}
    </div>
  );
}

export default App;
