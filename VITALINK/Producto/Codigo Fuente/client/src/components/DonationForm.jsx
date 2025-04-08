/* eslint-disable react/prop-types */

/**
 * Archivo jsx que representa el formulario de registro de donación de cabello
 */

import useLoadMDBScript from "../hooks/useLoadMDBScript";
import "../css/register.css";
//import "../css/donationRegister.css";
import { useForm } from "react-hook-form";
import { createDonacion } from "../services/donacionService";
import {
  MySwal,
  showConfirmationAlert,
  showErrorAlert,
  showLoadingAlert,
  showSuccessAlert,
} from "../utils/sweetAlertGeneralize";
import he from 'he'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDonanteByEmail } from "../services/donanteService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import RegisterButton from "./buttons/RegisterButton";
import CancelButton from "./buttons/CancelButton";
import Loading from "./loading/Loading";

const DonationForm = ({ donacionRealizada, onSubmit, peluquerias, isEdit }) => {
  const navigate = useNavigate();
  console.log("Valor de la donacion realizada: ", donacionRealizada);

  useLoadMDBScript();

  const navigateToListDonaciones = () => {
    navigate("/donaciones");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      email: donacionRealizada?.mail || "",
      nombre: donacionRealizada?.Donante?.nombre || "",
      apellido: donacionRealizada?.Donante?.apellido || "",
      telefono: donacionRealizada?.Donante?.telefono || "",
      entidad: donacionRealizada?.entidad || "",
    },
  });

  useEffect(() => {
    if (donacionRealizada) {
      reset({
        email: donacionRealizada.mail || "",
        nombre: donacionRealizada.Donante?.nombre || "",
        apellido: donacionRealizada.Donante?.apellido || "",
        telefono: donacionRealizada.Donante?.telefono || "",
        entidad: donacionRealizada.entidad || "",
      });

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
    }
  }, [donacionRealizada, reset]);
  //const [email, setEmail] = useState("");
  const [donanteData, setDonanteData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
  });

  useEffect(() => {
    if (donanteData) {
      // Forzar actualización de los labels después de buscar un donante
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
    }
  }, [donanteData]);

  const emailValue = watch("email");

  useEffect(() => {
    if (donanteData) {
      setValue("nombre", donanteData.nombre);
      setValue("apellido", donanteData.apellido);
      setValue("telefono", donanteData.telefono);
    }
  }, [donanteData, setValue]);

  const handleEmailVerification = async () => {
    const email = getValues("email");
    console.log("Email ingresado: ", email);
    if (!email) return;

    try {
      showLoadingAlert("Buscando...");

      const donante = await fetchDonanteByEmail(email.toLowerCase());
      console.log("El donante es: ", donante);
      MySwal.close();
      if (donante) {
        setDonanteData({
          nombre: donante.nombre,
          apellido: donante.apellido,
          telefono: donante.telefono,
        });
        setValue("nombre", donante.nombre);
        setValue("apellido", donante.apellido);
        setValue("telefono", donante.telefono);
      } else {
        setDonanteData({
          nombre: "",
          apellido: "",
          telefono: "",
        });
        setValue("nombre", "");
        setValue("apellido", "");
        setValue("telefono", "");
        showErrorAlert(
          "No se encontró un donante con email: " + email.toString()
        );
      }
    } catch (error) {
      setDonanteData({
        nombre: "",
        apellido: "",
        telefono: "",
      });
      setValue("nombre", "");
      setValue("apellido", "");
      setValue("telefono", "");
      showErrorAlert("Error al verificar el email");
      console.log("Error al verificar el email: ", error);
      MySwal.close();
    }
  };

  /**
   * Pasar el objeto donación
   * @param {*} donacion
   */
  const onSubmitDonacion = async (donacion) => {
    try {
      showLoadingAlert("Registrando...");

      const donacionData = {
        mail: donacion.email.toLowerCase(),
        entidad: Number(donacion.entidad) || null,
        telefono: donacion.telefono.toString(),
        nombre: donacion.nombre,
        apellido: donacion.apellido,
      };

      const newDonacion = await createDonacion(donacionData);
      MySwal.close();
      console.log("Registro exitoso: ", newDonacion);
      showSuccessAlert(
        `La donación ha sido registrada exitosamente. Email de agradecimiento enviado a ${newDonacion.mail}`
      );
      reset();
      navigate("/donaciones");
    } catch (error) {
      MySwal.close();
      console.log("Error al registrar una donación: ", error);
      showErrorAlert("Error al registrar la donación");
    }
  };

  // Función para solicitar la confirmación del registro
  /*
  const handleFormSubmit = (donacion) => {
    showConfirmationAlert("¿Desea registrar esta donación?", () => {
      onSubmitDonacion(donacion);
    });
  };
  */

  /**
   * Manejo de registro / actualizacion de una donación
   * @param {*} donacion - Pasar el objeto donación a registrar / actualizar
   */
  const handleFormSubmit = (donacion) => {
    if (isEdit) {
      showConfirmationAlert("¿Desea esta actualizar esta Donación?", () => {
        onSubmit(donacion);
      });
    } else {
      showConfirmationAlert("¿Desea registrar esta Donación?", () => {
        onSubmitDonacion(donacion);
      });
    }
  };

  if (!peluquerias) {
    return <Loading></Loading>;
  }

  return (
    <>
      <div className="container mt-4">
        <div className="card">
          <div className="card-header">
            <h5>{isEdit ? "Editar Donación" : "Registrar Donación"}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              {/* Email input */}
              <div className="form-group mb-4">
                <div className="row">
                  <div className="col-md-11">
                    <div className="form-outline">
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        autoComplete="off"
                        {...register("email", {
                          required: "Este campo es obligatorio",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Formato de email incorrecto",
                          },
                          maxLength: {
                            value: 50,
                            message:
                              "El email no puede contener más de 50 caracteres",
                          },
                        })}
                        readOnly={isEdit}
                      />
                      <label className="form-label" htmlFor="email">
                        Email Donante *
                      </label>
                    </div>
                  </div>
                  <div className="col-md-1 d-flex align-items-center justify-content-center">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm ml-2"
                      title="Buscar Donante"
                      onClick={handleEmailVerification}
                      disabled={!emailValue || isEdit}
                      style={{
                        marginTop: "12px",
                        height: "35px",
                      }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
                {errors.email && (
                  <div className="text-danger mt-1">{errors.email.message}</div>
                )}
              </div>

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
                        message:
                          "El nombre no puede contener más de 50 caracteres",
                      },
                    })}
                  />
                  <label className="form-label" htmlFor="nombre">
                    Nombre Donante *
                  </label>
                </div>
                {errors.nombre && (
                  <div className="text-danger mt-1">
                    {errors.nombre.message}
                  </div>
                )}
              </div>

              {/* Apellido input */}
              <div className="form-group mb-4">
                <div className="form-outline">
                  <input
                    type="text"
                    id="apellido"
                    className="form-control"
                    autoComplete="off"
                    {...register("apellido", {
                      required: "Este campo es obligatorio",
                      maxLength: {
                        value: 50,
                        message:
                          "El apellido no puede contener más de 50 caracteres",
                      },
                    })}
                  />
                  <label className="form-label" htmlFor="apellido">
                    Apellido Donante *
                  </label>
                </div>
                {errors.apellido && (
                  <div className="text-danger mt-1">
                    {errors.apellido.message}
                  </div>
                )}
              </div>

              {/* Télefono input */}
              <div className="form-group mb-4">
                <div className="form-outline">
                  <input
                    type="number"
                    id="telefono"
                    className="form-control"
                    autoComplete="off"
                    {...register("telefono", {
                      required: "Este campo es obligatorio",
                      maxLength: {
                        value: 15,
                        message:
                          "El télefono no puede contener más de 15 dígitos",
                      },
                    })}
                  />
                  <label className="form-label" htmlFor="telefono">
                    Télefono Donante *
                  </label>
                </div>
                {errors.telefono && (
                  <div className="text-danger mt-1">
                    {errors.telefono.message}
                  </div>
                )}
              </div>

              {/* Selected Peluqueria input */}
              <div className="form-group mb-4">
                <div className="form-outline">
                  <select
                    className="form-select"
                    id="entidad"
                    {...register("entidad", {
                      required: false,
                    })}
                  >
                    <option value="">Seleccione Peluquería </option>
                    {peluquerias.map((peluqueria) => (
                      <option key={peluqueria.nombre} value={peluqueria.nombre}>
                        {peluqueria.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit button */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <RegisterButton
                    accion={isEdit ? "Guardar Cambios" : "Registrar Donacion"}
                  />
                </div>
                <div className="col-md-6">
                  <CancelButton
                    onClick={() => navigateToListDonaciones()}
                  ></CancelButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationForm;
