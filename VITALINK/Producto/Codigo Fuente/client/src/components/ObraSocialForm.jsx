/* eslint-disable react/prop-types */

//import "../css/register.css";
import useLoadMDBScript from "../hooks/useLoadMDBScript";
import RegisterButton from "./buttons/RegisterButton";
import { useForm } from "react-hook-form";
//import { showConfirmationAlert } from "../utils/sweetAlertGeneralize";
import { useEffect } from "react";
import CancelButton from "./buttons/CancelButton";
import { useNavigate } from "react-router-dom";
import "../css/pedidoPeluca.css";

const ObraSocialForm = ({ obraSocial, onSubmit, isEdit }) => {
  useLoadMDBScript();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: obraSocial });

  useEffect(() => {
    reset(obraSocial);

    // Forzar actualización de los labels
    setTimeout(() => {
      const inputs = document.querySelectorAll(".form-outline input");
      inputs.forEach((input) => {
        if (input.value) {
          input.classList.add("active");
          const label = input.nextElementSibling;
          if (label && label.classList.contains("form-label")) {
            label.classList.add("active");
          }
        }
      });
    }, 0);
  }, [obraSocial, reset]);

  const navigateToListObras = () => {
    const urlListObras = "/obrasSociales/";
    navigate(urlListObras);
  };

  //Función para solicitar la confirmación del registro

  /**
   * Pasar la obra social a registrar en el sistema
   * @param {*} obraSocial
   */
  const handleFormSubmit = (obraSocial) => {
    onSubmit(obraSocial);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="card">
          <div className="card-header">
            <h5>{isEdit ? "Editar Obra Social" : "Registrar Obra Social"}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              {/* Nombre input */}
              <div className="form-group mb-4">
                <div className="form-outline">
                  <input
                    type="text"
                    id="nombre"
                    className="form-control"
                    autoComplete="off"
                    {...register("nombre", {
                      required: "Este campo es obligatorio",
                      maxLength: {
                        value: 50,
                        message: "El nombre debe tener menos de 50 caracteres",
                      },
                    })}
                  />
                  <label className="form-label" htmlFor="nombre">
                    Nombre Obra Social *
                  </label>
                </div>
                {errors.nombre && (
                  <div className="text-danger mt-1">
                    {errors.nombre.message}
                  </div>
                )}
              </div>
              {/* Submit button */}
              <div className="row mb-4">
                <div className="col-md-12">
                  <RegisterButton
                    accion={
                      isEdit ? "Guardar Cambios" : "Registrar Obra Social"
                    }
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-12">
                  <CancelButton
                    onClick={() => navigateToListObras()}
                  ></CancelButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObraSocialForm;
