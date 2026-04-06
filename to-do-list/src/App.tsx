import { useState } from 'react';
import './App.css';
import Tabla from './components/Tabla';
import PopUp from './components/PopUp';

interface Tarea{
  titulo: string;
  id: number;
  prioridad: "Baja" | "Media" | "Alta";
  estado: "Pendiente" | "Terminado";
  completa: boolean;
}


function App() {
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [mostrarPopUp, setMostrarPopUp] = useState<boolean>(false)
 
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
      completa:false
    };
    
    setTareas([...tareas, nuevaTarea ])

    setMostrarPopUp(false)
  }
  return (
    
    <div> 
      <section id="center">
        <div>
          <h1>Gestor de tareas</h1>
        </div>
      </section>

      <section className='navegacion'>
        
      </section>

      <section>
        <div id="toolbar">
          <button className='button' onClick={() => {
            console.log("mostrar desde el boton -> ");
            setMostrarPopUp(true);
          }}>
            Agregar tarea
          </button>
        </div>
      </section>

          {/* TABLA */}
      <section id="center">
        <Tabla tareas={tareas} setTareas={setTareas} />
      </section>

      {mostrarPopUp === true 
      ?

            // POPUP
      <section>
        <PopUp onSubmit={onSubmit} setMostrarPopUp={setMostrarPopUp} />
      </section>

      : null}
    </div>
  )
}

export default App
