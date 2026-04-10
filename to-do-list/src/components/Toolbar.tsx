interface ToolbarProps {
  setMostrarPopUp: (mostrarPopUp: boolean) => void;
  onOrdenarPrioridad: () => void;
  setTextoIngresado: (textoIngresado: string) => void;
  setEstadoSeleccionado: (estadoSeleccionado: string) => void;
  filtrar: () => void;
  estadoSeleccionado: string;
  textoIngresado: string;
}

export const Toolbar = ({
  setMostrarPopUp,
  onOrdenarPrioridad,
  setTextoIngresado,
  setEstadoSeleccionado,
  filtrar,
  estadoSeleccionado,
  textoIngresado,
}: ToolbarProps) => {
  return (
    <div id="toolbar">
      <button
        className="button"
        onClick={() => {
          console.log("mostrar desde el boton -> ");
          setMostrarPopUp(true);
        }}
      >
        Agregar tarea
      </button>

      <div style={{ display: "flex", gap: "10px" }}>
        <button className="button" onClick={onOrdenarPrioridad}>
          Ordenar Prioridad
        </button>

        <select
          name="select"
          className="select"
          value={estadoSeleccionado}
          onChange={(event) => {
            setEstadoSeleccionado(event.target.value);
          }}
        >
          <option value="Todos" selected>
            Todos
          </option>
          <option value="Terminado">Terminado</option>
          <option value="Pendiente">Pendiente</option>
        </select>

        <div>
          <label>Buscar: </label>
          <input
            className="search"
            type="text"
            name="nombreTarea"
            value={textoIngresado}
            onChange={(event) => {
              setTextoIngresado(event.target.value);
            }}
          />
        </div>

        <button
          className="button"
          style={{ marginLeft: 5 }}
          onClick={() => {
            filtrar();
          }}
        >
          Filtrar
        </button>
      </div>
    </div>
  );
};
