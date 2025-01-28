import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "../css/register.css";
import useLoadMDBScript from "../hooks/useLoadMDBScript";
import { useNavigate } from "react-router-dom";

const PeluqueriaForm = ({ onSubmit, peluqueria, isReadOnly, barrios }) => {
  const navigate = useNavigate();

  useLoadMDBScript();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: peluqueria,
  });

  useEffect(() => {
    reset(peluqueria);
  }, [peluqueria, reset]);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Nombre input */}
        <div className="form-group mb-4">
          <div className="form-outline">
            <input
              type="text"
              id="nombre"
              className="form-control"
              autoComplete="off"
              {...register("nombre", {
                required: true,
                maxLength: 50,
              })}
              readOnly={isReadOnly}
            />
            <label className="form-label" htmlFor="nombre">
              Nombre Peluquería *
            </label>
          </div>
          {errors.nombre?.type === "required" && (
            <div className="text-danger mt-1">Este campo es obligatorio</div>
          )}
          {errors.nombre?.type === "maxLength" && (
            <div className="text-danger mt-1">
              El nombre de la peluquería debe contener menos de 50 caracteres
            </div>
          )}
        </div>

        {/* Contacto input */}
        <div className="form-group mb-4">
          <div className="form-outline">
            <input
              type="text"
              id="contacto"
              className="form-control"
              autoComplete="off"
              {...register("contacto", {
                required: true,
                maxLength: 50,
              })}
              readOnly={isReadOnly}
            />
            <label className="form-label" htmlFor="contacto">
              Contacto *
            </label>
          </div>
          {errors.contacto?.type === "required" && (
            <div className="text-danger mt-1">Este campo es obligatorio</div>
          )}
          {errors.contacto?.type === "maxLength" && (
            <div className="text-danger mt-1">
              El nombre del contacto debe contener menos de 50 carácteres
            </div>
          )}
        </div>

        {/* Num. Movil input */}
        <div className="form-group mb-4">
          <div className="form-outline">
            <input
              type="text"
              id="nroCelular"
              className="form-control"
              autoComplete="off"
              {...register("nroCelular", {
                maxLength: 50,
              })}
              readOnly={isReadOnly}
            />
            <label className="form-label" htmlFor="nroCelular">
              Número de Celular
            </label>
          </div>
          {errors.nroCelular?.type === "maxLength" && (
            <div className="text-danger mt-1">
              El número de celular debe contener menos de 50 caracteres
            </div>
          )}
        </div>

        {/* Num. Fijo input */}
        <div className="form-group mb-4">
          <div className="form-outline">
            <input
              type="text"
              id="nroFijo"
              className="form-control"
              autoComplete="off"
              {...register("nroFijo", {
                maxLength: 50,
              })}
              readOnly={isReadOnly}
            />
            <label className="form-label" htmlFor="nroFijo">
              Número de Teléfono
            </label>
          </div>
          {errors.nroFijo?.type === "maxLength" && (
            <div className="text-danger mt-1">
              El número fijo debe contener menos de 50 caracteres
            </div>
          )}
        </div>

        {/* Dirección input */}
        <div className="form-group mb-4">
          <div className="form-outline">
            <input
              type="text"
              id="calle"
              className="form-control"
              autoComplete="off"
              {...register("calle", {
                required: true,
                maxLength: 50,
              })}
              readOnly={isReadOnly}
            />
            <label className="form-label" htmlFor="calle">
              Dirección *
            </label>
          </div>
          {errors.calle?.type === "required" && (
            <div className="text-danger mt-1">Este campo es obligatorio</div>
          )}
          {errors.calle?.type === "maxLength" && (
            <div className="text-danger mt-1">
              La dirección debe contener menos de 50 carácteres
            </div>
          )}
        </div>

        {/* Select input */}
        <div className="form-outline mb-4">
          <select
            className="form-select"
            aria-label="Default select example"
            id="barrio"
            {...register("barrio")}
            disabled={isReadOnly}
          >
            <option disabled value="">
              Seleccione Barrio
            </option>
            {barrios.map((barrio) => (
              <option key={barrio.id} value={barrio.id}>
                {barrio.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Botones */}
        <div className="form-buttons">
          {!isReadOnly && (
            <button type="submit" className="btn btn-primary btn-block mb-4">
              Guardar Cambios
            </button>
          )}
          {isReadOnly && (
            <button
              type="button"
              className="btn btn-primary btn-block mb-4"
              onClick={() => navigate("/peluquerias")}
            >
              Volver a la Tabla
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PeluqueriaForm;
