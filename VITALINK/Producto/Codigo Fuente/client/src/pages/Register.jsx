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
import CancelButton from "../components/buttons/CancelButton";
import Loading from "../components/loading/Loading";

const urlBaseBarrios = "http://localhost:8000/api/barrios/";
const urlBasePeluquerias = "http://localhost:8000/api/peluquerias/";
const OPEN_CAGE_API_KEY = "2feb4adcff3c43e8a815ab2ce7879f02"; // Reemplaza con tu clave de OpenCage

const Register = () => {
  const [barrios, setBarrios] = useState([]);
  const [suggestions, setSuggestions] = useState([]); // Para sugerencias de direcciones
  const [direccion, setDireccion] = useState(""); // Dirección seleccionada

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useLoadMDBScript();

  useEffect(() => {
    fetchBarrios();
  }, []);

  const fetchBarrios = async () => {
    try {
      const res = await axios.get(urlBaseBarrios);
      setBarrios(res.data);
    } catch (error) {
      console.log("No se pudo obtener los barrios: ", error);
    }
  };

  const handleAddressChange = async (e) => {
    const query = e.target.value;
    setDireccion(query);

    if (query.length < 3) {
      setSuggestions([]); // Limpiar sugerencias si el texto es corto
      return;
    }

    try {
      const res = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json`,
        {
          params: {
            q: query,
            key: OPEN_CAGE_API_KEY,
            limit: 5, // Limitar sugerencias
            countrycode: "ar", // Opcional: restringir por país (ejemplo: 'ar' para Argentina)
          },
        }
      );

      const results = res.data.results.map((result) => result.formatted); // Extraer direcciones
      setSuggestions(results);
    } catch (error) {
      console.log("Error al obtener sugerencias de direcciones: ", error);
    }
  };

  const onSuggestionClick = (suggestion) => {
    setDireccion(suggestion); // Configurar la dirección seleccionada
    setSuggestions([]); // Limpiar las sugerencias
  };

  const onSubmitPeluqueria = async (peluqueria) => {
    const barrio =
      peluqueria.barrio === "Seleccione Barrio" ? null : peluqueria.barrio;
  
    try {
      // Obtener coordenadas de la dirección seleccionada
      const res = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json`,
        {
          params: {
            q: direccion, // Dirección seleccionada
            key: OPEN_CAGE_API_KEY,
          },
        }
      );
  
      const geometry = res.data.results[0]?.geometry;
      if (!geometry) {
        console.log("No se pudieron obtener las coordenadas");
        return;
      }
  
      const newPeluqueria = {
        ...peluqueria,
        nroCelular: peluqueria.nroCelular.toString(),
        nroFijo: peluqueria.nroFijo.toString(),
        barrio: barrio,
        calle: direccion, // Dirección seleccionada
        latitud: geometry.lat, // Agregar latitud
        longitud: geometry.lng, // Agregar longitud
      };
  
      registerPeluqueria(newPeluqueria);
    } catch (error) {
      console.error("Error al obtener coordenadas:", error);
    }
  };
  
  const registerPeluqueria = async (newPeluqueria) => {
    try {
      const res = await axios.post(urlBasePeluquerias, newPeluqueria);
      showSuccessAlert();
      reset();
      navigate("/peluquerias");
    } catch (error) {
      showErrorAlert("No se pudo registrar la peluquería. Intente nuevamente");
    }
  };

  if (!barrios) {
    return <Loading />;
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h5>Registrar Peluquería</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmitPeluqueria)}>
            {/* Nombre Peluquería */}
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
                      message: "El nombre debe contener menos de 50 caracteres",
                    },
                  })}
                />
                <label className="form-label" htmlFor="nombre">
                  Nombre Peluquería *
                </label>
              </div>
              {errors.nombre && (
                <div className="text-danger mt-1">{errors.nombre.message}</div>
              )}
            </div>

            {/* Contacto */}
            <div className="form-group mb-4">
              <div className="form-outline">
                <input
                  type="text"
                  id="contacto"
                  className="form-control"
                  autoComplete="off"
                  {...register("contacto", {
                    required: "Este campo es obligatorio",
                    maxLength: {
                      value: 50,
                      message:
                        "El contacto debe contener menos de 50 caracteres",
                    },
                  })}
                />
                <label className="form-label" htmlFor="contacto">
                  Contacto *
                </label>
              </div>
              {errors.contacto && (
                <div className="text-danger mt-1">
                  {errors.contacto.message}
                </div>
              )}
            </div>

            {/* Número de Celular */}
            <div className="form-group mb-4">
              <div className="form-outline">
                <input
                  type="number"
                  id="nroCelular"
                  className="form-control"
                  autoComplete="off"
                  {...register("nroCelular", {
                    maxLength: {
                      value: 50,
                      message:
                        "El número de celular debe contener menos de 50 caracteres",
                    },
                  })}
                />
                <label className="form-label" htmlFor="nroCelular">
                  Número de Celular
                </label>
              </div>
              {errors.nroCelular && (
                <div className="text-danger mt-1">
                  {errors.nroCelular.message}
                </div>
              )}
            </div>

            {/* Número Fijo */}
            <div className="form-group mb-4">
              <div className="form-outline">
                <input
                  type="number"
                  id="nroFijo"
                  className="form-control"
                  autoComplete="off"
                  {...register("nroFijo", {
                    maxLength: {
                      value: 50,
                      message:
                        "El número fijo debe contener menos de 50 caracteres",
                    },
                  })}
                />
                <label className="form-label" htmlFor="nroFijo">
                  Número de Teléfono
                </label>
              </div>
              {errors.nroFijo && (
                <div className="text-danger mt-1">{errors.nroFijo.message}</div>
              )}
            </div>

            {/* Dirección con Autocompletado */}
            <div className="form-group mb-4">
              <div className="form-outline">
                <input
                  type="text"
                  id="calle"
                  className="form-control"
                  autoComplete="off"
                  value={direccion}
                  onChange={handleAddressChange}
                  placeholder="Ingresa la dirección"
                />
                <label className="form-label" htmlFor="calle">
                  Dirección *
                </label>
              </div>
              {suggestions.length > 0 && (
                <ul className="list-group">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="list-group-item"
                      onClick={() => onSuggestionClick(suggestion)}
                      style={{ cursor: "pointer" }}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Barrio */}
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

            <div className="row mb-4">
              <div className="col-md-6">
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                >
                  Registrar Peluquería
                </button>
              </div>
              <div className="col-md-6">
                <CancelButton onClick={() => navigate("/peluquerias")} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
