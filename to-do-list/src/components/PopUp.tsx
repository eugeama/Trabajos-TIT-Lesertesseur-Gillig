import { useForm, type Resolver } from "react-hook-form";
import type { Tarea } from "../types/tareas";

interface PopUpProps {
  onAgregarTarea: (data: Tarea) => void;
  setMostrarPopUp: (valor: boolean) => void;
}

type FormValues = {
  id: number;
  titulo: string;
  prioridad: "Baja" | "Media" | "Alta";
  estado: "Pendiente" | "Terminado";
};

const resolver: Resolver<FormValues> = async (values) => {
  if (!values.id) {
    return {
      values: values.id ? values : {},
      errors: !values.id
        ? {
            id: {
              type: "required",
              message: "Ingrese un id",
            },
          }
        : {},
    };
  }

  if (!values.titulo) {
    return {
      values: values.titulo ? values : {},
      errors: !values.titulo
        ? {
            titulo: {
              type: "required",
              message: "El titulo es obligatorio",
            },
          }
        : {},
    };
  }

  if (!values.estado) {
    return {
      values: values.estado ? values : {},
      errors: !values.estado
        ? {
            estado: {
              type: "required",
              message: "El estado es obligatorio",
            },
          }
        : {},
    };
  }

  if (!values.prioridad) {
    return {
      values: values.prioridad ? values : {},
      errors: !values.prioridad
        ? {
            prioridad: {
              type: "required",
              message: "La prioridad es obligatoria",
            },
          }
        : {},
    };
  }

  return {
    values: values,
    errors: {},
  };
};

function PopUp({ onAgregarTarea, setMostrarPopUp }: PopUpProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit((data) => {
    const tarea: Tarea = {
      titulo: data.titulo,
      id: data.id,
      prioridad: data.prioridad,
      estado: data.estado,
      completa: false,
    };

    onAgregarTarea(tarea);
  });

  return (
    <div className="overlay">
      <div className="popup">
        <form onSubmit={onSubmit}>
          <h2>Agregar tarea</h2>

          <div className="formLine">
            <label className="formLabel">Id</label>
            <input {...register("id")} className="inputData" />
          </div>
          <div className="errorInput">{errors?.id && <p>{errors.id.message}</p>}</div>

          <div className="formLine">
            <label className="formLabel">Titulo</label>
            <input {...register("titulo")} className="inputData" />
          </div>
          <div className="errorInput">{errors?.titulo && <p>{errors.titulo.message}</p>}</div>

          <div className="formLine">
            <label className="formLabel">Estado</label>

            <select className="inputData" {...register("estado")}>
              <option value="" disabled selected>
                seleccione estado
              </option>
              <option value="Terminado">Terminado</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          </div>
          <div className="errorInput">{errors?.estado && <p>{errors.estado.message}</p>}</div>

          <div className="formLine">
            <label className="formLabel">Prioridad</label>
            <select className="inputData" {...register("prioridad")}>
              <option value="" disabled selected>
                seleccione prioridad
              </option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>
          <div className="errorInput">{errors?.prioridad && <p>{errors.prioridad.message}</p>}</div>

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
