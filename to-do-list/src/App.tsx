import { useState } from 'react';
import './App.css';

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

      <section id="center">
        <table className='table'>
          <thead>
            <tr>  
              <th>Id</th>
              <th>Título</th>
              <th>Estado</th>
              <th>Prioridad</th>
              <th>Completada</th>
              
            </tr>
          </thead>
          <tbody>
            {
              tareas?.map((tarea) => {
                return(
                  <tr key={tarea.id} onClick={() => {
                    console.log("clkick en la fila -> ", tarea.id)
                    const tareaEncontrada = tareas.find((fila) => {
                      return fila.id === tarea.id
                    })
                    if(tareaEncontrada){
                      tareaEncontrada.completa = !tareaEncontrada.completa
                    }
                      setTareas([...tareas])
                  }}>  
                    <td>{tarea.id}</td>
                    <td>{tarea.titulo}</td>
                    <td>{tarea.estado}</td>
                    <td>{tarea.prioridad}</td>
                    <td>{tarea.completa ? "COMPLETADA" : ""}</td>
                  </tr>
                );
              })
            }
            
          </tbody>
        </table>
      </section>

      {mostrarPopUp === true 
      ?
      <div className='overlay'>
        <div className='popup' >
         <form action={onSubmit}>
          
          <div className='formLine'>
            <label className='formLabel'>Id</label>
            <input type="text" name="id" required/>
          </div>
          
          <div className='formLine'>
            <label className='formLabel'>Titulo</label>
            <input type="text" name="titulo" required/>
          </div>

          <div className='formLine'>
            <label className='formLabel'>Estado</label>
            <input type="text"  name="estado" required/>
          </div>
                    
          <div className='formLine'>
            <label className='formLabel'>Prioridad</label>
            <input type="text" name="prioridad" required/>
          </div>

          <div className='buttonbar'>
            <button className='button' type='submit'>
              Aceptar 
            </button>
            
            <button className='button' onClick={() => {
              setMostrarPopUp(false);
            }}>
              Cerrar 
            </button>
          </div>
         </form>

        </div>
      </div>
      : null}
    </div>
  )
}

export default App
