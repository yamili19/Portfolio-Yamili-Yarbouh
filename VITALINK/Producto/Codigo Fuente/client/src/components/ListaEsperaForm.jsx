import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ListaEsperaForm = ({
  dni,
  setDni,
  paciente,
  menor,
  setMenor,
  onDniSearch,
  onSubmit,
  fechaSolicitud,
}) => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setMenor(e.target.checked);
  };

  useEffect(() => {
    if (paciente) {
      setValue("nombre", paciente.nombre);
      setValue("apellido", paciente.apellido);
    }
  }, [paciente, setValue]);

  const onSubmitForm = (data) => {
    const nombre = getValues("nombre");
    const apellido = getValues("apellido");

    // Validacion
    if (!nombre || !apellido) {
      Swal.fire({
        icon: "error",
        title: "Campos vacíos",
        text: "Debes buscar el DNI para completar los campos de nombre y apellido.",
      });
      return;
    }

    onSubmit({
      dni: Number(data.dni),
      menor: menor,
      fechaSolicitud: fechaSolicitud,
    });
  };

  const handleCancel = () => {
    navigate("/listaEspera");
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h5>Registrar en Lista de Espera</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmitForm)}>
            {/* Fecha */}
            <div className="form-group mb-4">
              <label htmlFor="fecha">Fecha de Solicitud *</label>
              <input
                type="text"
                id="fechaSolicitud"
                className="form-control"
                value={fechaSolicitud}
                readOnly
              />
            </div>

            {/* DNI con botón de búsqueda */}
            <div className="form-group mb-4">
              <label htmlFor="dni">DNI *</label>
              <div className="d-flex aling-items-center">
                <input
                  type="text"
                  id="dni"
                  className="form-control me-2"
                  {...register("dni", {
                    required: "Este campo es obligatorio",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Solo se permiten números",
                    },
                    maxLength: {
                      value: 8,
                      message: "El DNI no puede tener más de 8 dígitos",
                    },
                  })}
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                />

                <button
                  type="button"
                  className="btn btn-secondary btn-sm align-self-center"
                  onClick={onDniSearch} // búsqueda por DNI
                  title="Buscar DNI"
                >
                  🔍
                </button>
              </div>
            </div>

            {/* Nombre */}
            <div className="form-group mb-4">
              <label htmlFor="nombre">Nombre *</label>
              <input
                type="text"
                id="nombre"
                className="form-control"
                {...register("nombre")}
                readOnly
                required
              />
            </div>

            {/* Apellido */}
            <div className="form-group mb-4">
              <label htmlFor="apellido">Apellido *</label>
              <input
                type="text"
                id="apellido"
                className="form-control"
                {...register("apellido")}
                readOnly
                required
              />
            </div>

            {/* Es Menor */}
            <div className="form-group mb-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="menor"
                  className="form-check-input"
                  checked={menor}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="menor">
                  ¿Es para un menor de edad? *
                </label>
              </div>
            </div>

            {/* Botones de Enviar y Cancelar */}
            <div className="d-flex justify-content-between mb-3">
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 me-2"
              >
                Registrar en Lista de Espera
              </button>
              <button
                type="button"
                className="btn btn-danger btn-lg w-100"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListaEsperaForm;
