import { useState } from "react";

interface PopUpProps {
  onSubmit: (formData: FormData) => void;
  setMostrarPopUp: (valor: boolean) => void;
}

function PopUp({ onSubmit, setMostrarPopUp }: PopUpProps) {
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  const [prioridadSeleccionada, setPrioridadSeleccionada] = useState("");
  return (
    <div className="overlay">
      <div className="popup">
        <form action={onSubmit}>
          <h2>Agregar tarea</h2>

          <div className="formLine">
            <label className="formLabel">Id</label>
            <input type="text" name="id" required className="inputData" />
          </div>

          <div className="formLine">
            <label className="formLabel">Titulo</label>
            <input type="text" name="titulo" required className="inputData" />
          </div>

          <div className="formLine">
            <label className="formLabel">Estado</label>

            <select
              name="estado"
              required
              className="inputData"
              value={estadoSeleccionado}
              onChange={(event) => {
                setEstadoSeleccionado(event.target.value);
              }}
            >
              <option value="" disabled selected>
                seleccione estado
              </option>
              <option value="Terminado">Terminado</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          </div>

          <div className="formLine">
            <label className="formLabel">Prioridad</label>
            <select
              name="prioridad"
              required
              className="inputData"
              value={prioridadSeleccionada}
              onChange={(event) => {
                setPrioridadSeleccionada(event.target.value);
              }}
            >
              <option value="" disabled selected>
                seleccione prioridad
              </option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>

          <div className="buttonbar">
            <button className="button" type="submit">
              Aceptar
            </button>

            <button
              className="button"
              onClick={() => {
                setMostrarPopUp(false);
              }}
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopUp;
