interface Tarea{
  titulo: string;
  id: number;
  prioridad: "Baja" | "Media" | "Alta";
  estado: "Pendiente" | "Terminado";
  completa: boolean;
}

interface TablaProps {
  tareas: Tarea[];
  setTareas: (tareas: Tarea[]) => void;
}

function Tabla({ tareas, setTareas }: TablaProps) {
  return (
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
            return (
              <tr key={tarea.id} onClick={() => {
                console.log("clkick en la fila -> ", tarea.id)
                const tareaEncontrada = tareas.find((fila) => {
                  return fila.id === tarea.id
                })
                if (tareaEncontrada) {
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
  );
}

export default Tabla;