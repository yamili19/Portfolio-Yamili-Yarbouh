import { useEffect, useState } from "react";
import "../css/register.css";
import {
  showConfirmationAlert,
  showErrorAlert,
  showSuccessAlert,
} from "../utils/sweetAlert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import useLoadMDBScript from "../hooks/useLoadMDBScript";

//RECORDATORIO: Mover cada fetching a la carpeta service y llamarlos desde el archivo correspondiente de dicha carpeta

const urlBaseBarrios = "http://localhost:8000/api/barrios/";
const urlBasePeluquerias = "http://localhost:8000/api/peluquerias/";

const Register = () => {
  const [barrios, setBarrios] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useLoadMDBScript();

  /**
   * Se utiliza axios para obtener todos los barrios
   */

  useEffect(() => {
    fetchBarrios();
  }, []);

  const fetchBarrios = async () => {
    try {
      const res = await axios.get(urlBaseBarrios);
      console.log("Barrios desde el back: ", res.data);
      setBarrios(res.data);
    } catch (error) {
      console.log("No se pudo obtener los barrios: ", error);
    }
  };

  const onSubmitPeluqueria = async (peluqueria) => {
    const newPeluqueria = {
      ...peluqueria,
      nroCelular: peluqueria.nroCelular.toString(),
      nroFijo: peluqueria.nroFijo.toString(),
    };

    //Se muestra alerta de confirmacion
    showConfirmationAlert(() => {
      registerPeluqueria(newPeluqueria);
    });
  };

  const registerPeluqueria = async (newPeluqueria) => {
    try {
      const res = await axios.post(urlBasePeluquerias, newPeluqueria);
      console.log("Nueva peluqueria registrada: ", res.data);
      showSuccessAlert();
      reset();
      navigate("/peluquerias");
    } catch (error) {
      console.log("ERROR, no se pudo registrar la nueva peluqueria");
      showErrorAlert("No se pudo registrar la peluqueria. Intente nuevamente");
    }
  };

  return (
    <>
      <div className="form-container">
        <form
          style={{ width: "30rem" }}
          onSubmit={handleSubmit(onSubmitPeluqueria)}
        >
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
                El nombre debe contener menos de 50 caracteres
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
                El contacto debe contener menos de 50 caracteres
              </div>
            )}
          </div>

          {/* Num. Movil input */}
          <div className="form-group mb-4">
            <div className="form-outline">
              <input
                type="number"
                id="nroCelular"
                className="form-control"
                autoComplete="off"
                {...register("nroCelular", {
                  maxLength: 50,
                })}
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

          {/* Num. Movil input */}
          <div className="form-group mb-4">
            <div className="form-outline">
              <input
                type="number"
                id="nroFijo"
                className="form-control"
                autoComplete="off"
                {...register("nroFijo", {
                  maxLength: 50,
                })}
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
              />
              <label className="form-label" htmlFor="calle">
                Dirección *
              </label>
            </div>
            {errors.calle?.type === "required" && (
              <div className="text-danger mt-1">Este campo es obligatorio</div>
            )}
            {errors.contacto?.type === "maxLength" && (
              <div className="text-danger mt-1">
                La dirección debe contener menos de 50 caracteres
              </div>
            )}
          </div>

          {/* Select input */}
          <div className="form-group mb-4">
            <div className="form-outline">
              <select
                className="form-select"
                aria-label="Default select example"
                id="barrio"
                {...register("barrio")}
              >
                <option disabled selected>
                  Seleccione Barrio
                </option>
                {barrios.map((barrio) => (
                  <option key={barrio.id} value={barrio.id}>
                    {barrio.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary btn-block mb-4">
            Registrar Peluquería
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
