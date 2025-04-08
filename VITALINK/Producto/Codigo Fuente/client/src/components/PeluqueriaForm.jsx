/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../css/register.css";
import useLoadMDBScript from "../hooks/useLoadMDBScript";
import { useNavigate } from "react-router-dom";
import CancelButton from "./buttons/CancelButton";
import axios from "axios";

const PeluqueriaForm = ({ onSubmit, peluqueria, isReadOnly, barrios }) => {
  const navigate = useNavigate();
  const [addressSuggestions, setAddressSuggestions] = useState([]); // Estado para las sugerencias de direcciones
  const [isAddressLoading, setIsAddressLoading] = useState(false); // Estado para controlar el estado de carga
  const [direccion, setDireccion] = useState(""); // Dirección seleccionada

  useLoadMDBScript();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue, // Usaremos esto para actualizar el valor del campo de dirección
  } = useForm({
    defaultValues: peluqueria,
  });

  useEffect(() => {
    reset(peluqueria);
  }, [peluqueria, reset]);

  // Función para obtener las sugerencias de direcciones
  const handleAddressChange = async (e) => {
    const query = e.target.value;
    setDireccion(query); // Actualizar dirección

    if (!query) {
      setAddressSuggestions([]);
      return;
    }

    setIsAddressLoading(true);
    try {
      const res = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
        params: {
          q: query,
          key: "35e9475e94ea47758df1753b46aaf09f", // Tu API Key de OpenCage
        },
      });

      const suggestions = res.data.results.map(result => result.formatted);
      setAddressSuggestions(suggestions);
    } catch (error) {
      console.log("Error al obtener direcciones:", error);
    }
    setIsAddressLoading(false);
  };

  const handleAddressSelect = (address) => {
    setValue("calle", address); // Actualiza el valor del campo de dirección
    setDireccion(address); // Establece la dirección seleccionada
    setAddressSuggestions([]); // Limpia las sugerencias después de seleccionar
  };

  // Función para el submit
  const handleFormSubmit = async (data) => {
    // Obtener coordenadas de la dirección
    const { calle } = data;
    try {
      const res = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
        params: {
          q: calle,
          key: "35e9475e94ea47758df1753b46aaf09f", // Tu API Key de OpenCage
        },
      });

      const geometry = res.data.results[0]?.geometry;
      if (!geometry) {
        console.log("No se pudieron obtener las coordenadas");
        return;
      }

      // Agregar las coordenadas a los datos
      const updatedData = {
        ...data,
        latitud: geometry.lat,
        longitud: geometry.lng,
      };

      onSubmit(updatedData); // Llamamos al onSubmit pasándole los datos con las coordenadas
    } catch (error) {
      console.log("Error al obtener coordenadas:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h5>
            {isReadOnly ? "Detalles de la Peluquería" : "Actualizar Peluquería"}
          </h5>
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
                <div className="text-danger mt-1">
                  Este campo es obligatorio
                </div>
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
                <div className="text-danger mt-1">
                  Este campo es obligatorio
                </div>
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
                    maxLength: 100,
                  })}
                  onChange={handleAddressChange}
                  readOnly={isReadOnly}
                />
                <label className="form-label" htmlFor="calle">
                  Dirección *
                </label>
              </div>
              {errors.calle?.type === "required" && (
                <div className="text-danger mt-1">
                  Este campo es obligatorio
                </div>
              )}
              {errors.calle?.type === "maxLength" && (
                <div className="text-danger mt-1">
                  La dirección debe contener menos de 100 caracteres
                </div>
              )}
              {/* Mostrar sugerencias de direcciones */}
              {addressSuggestions.length > 0 && !isAddressLoading && (
                <ul className="list-group mt-2">
                  {addressSuggestions.map((address, index) => (
                    <li
                      key={index}
                      className="list-group-item"
                      onClick={() => handleAddressSelect(address)}
                    >
                      {address}
                    </li>
                  ))}
                </ul>
              )}
              {isAddressLoading && (
                <div className="text-muted mt-1">Cargando sugerencias...</div>
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
            <div className="row mb-4">
              {!isReadOnly && (
                <>
                  <div className="col-md-6">
                    <button type="submit" className="btn btn-primary btn-block">
                      Guardar Cambios
                    </button>
                  </div>
                  <div className="col-md-6">
                    <CancelButton
                      onClick={() => navigate("/peluquerias")}
                    ></CancelButton>
                  </div>
                </>
              )}
              {isReadOnly && (
                <div className="col-md-12">
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={() => navigate("/peluquerias")}
                  >
                    Volver a la Lista de peluquerias afiliadas
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PeluqueriaForm;
