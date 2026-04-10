interface PopUpProps {
  onSubmit: (formData: FormData) => void;
  setMostrarPopUp: (valor: boolean) => void;
}

function PopUp({
  onSubmit, 
  setMostrarPopUp
 }: PopUpProps) {

  return (
    <div className='overlay'>
      <div className='popup'>
        <form action={onSubmit}>

          <div className='formLine'>
            <label className='formLabel'>Id</label>
            <input type="text" name="id" required />
          </div>

          <div className='formLine'>
            <label className='formLabel'>Titulo</label>
            <input type="text" name="titulo" required />
          </div>

          <div className='formLine'>
            <label className='formLabel'>Estado</label>
            <input type="text" name="estado" required />
          </div>

          <div className='formLine'>
            <label className='formLabel'>Prioridad</label>
            <input type="text" name="prioridad" required />
          </div>

          <div className='buttonbar'>
            <button className='button' type='submit' >
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
  );
}

export default PopUp;