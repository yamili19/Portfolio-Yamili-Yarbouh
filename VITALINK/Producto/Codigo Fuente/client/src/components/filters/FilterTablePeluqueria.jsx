/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import "../../css/table.css";
import useLoadMDBScript from "../../hooks/useLoadMDBScript";

const FilterTablePeluqueria = ({ onFilter }) => {
  useLoadMDBScript();
  const [filters, setFilters] = useState({
    nombre: "",
    contacto: "",
    nroCelular: "",
    nroTelefono: "",
    barrio: "",
  });

  const [barrios, setBarrios] = useState([]);
  const urlBaseBarrios = "http://localhost:8000/api/barrios/";

  useEffect(() => {
    const fetchBarrios = async () => {
      try {
        const response = await fetch(urlBaseBarrios);
        const data = await response.json();
        setBarrios(data);
      } catch (error) {
        console.error("Error fetching barrios:", error);
      }
    };
    fetchBarrios();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (
      ((id === "nroCelular" || id === "nroTelefono") && isNaN(value)) ||
      ((id === "nombre" || id === "contacto") && /[^a-zA-Z\s]/.test(value))
    ) {
      return;
    }

    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [id]: value,
      };
      onFilter(newFilters);
      return newFilters;
    });
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      nombre: "",
      contacto: "",
      nroCelular: "",
      nroTelefono: "",
      barrio: "",
    };
    setFilters(clearedFilters);
    onFilter(clearedFilters);
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h5>Buscar Peluquería</h5>
        </div>
        <div className="card-body">
          <form>
            {/* Primera fila: Nombre y Contacto */}
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-outline">
                  <input
                    type="text"
                    id="nombre"
                    className="form-control"
                    value={filters.nombre}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "#ffe4e1" }}
                  />
                  <label className="form-label" htmlFor="nombre">
                    Nombre
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-outline">
                  <input
                    type="text"
                    id="contacto"
                    className="form-control"
                    value={filters.contacto}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "#ffe4e1" }}
                  />
                  <label className="form-label" htmlFor="contacto">
                    Contacto
                  </label>
                </div>
              </div>
            </div>

            {/* Segunda fila: Nro Celular y Nro Teléfono */}
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-outline">
                  <input
                    type="text"
                    id="nroCelular"
                    className="form-control"
                    value={filters.nroCelular}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "#ffe4e1" }}
                  />
                  <label className="form-label" htmlFor="nroCelular">
                    Nro Celular
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-outline">
                  <input
                    type="text"
                    id="nroTelefono"
                    className="form-control"
                    value={filters.nroTelefono}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "#ffe4e1" }}
                  />
                  <label className="form-label" htmlFor="nroTelefono">
                    Nro Teléfono
                  </label>
                </div>
              </div>
            </div>

            {/* Tercera fila: Select Barrio */}
            <div className="row mb-3">
              <div className="col-md-12">
                <div className="form-outline">
                  <select
                    id="barrio"
                    className="form-select"
                    value={filters.barrio}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "#ffe4e1" }}
                  >
                    <option value="">Seleccione Barrio</option>
                    {barrios.map((barrio) => (
                      <option key={barrio.id} value={barrio.nombre}>
                        {barrio.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Cuarta fila: Botón Limpiar Filtros */}
            <div className="row">
              <div className="col-md-12 d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClearFilters}
                >
                  Limpiar Filtros
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FilterTablePeluqueria;
