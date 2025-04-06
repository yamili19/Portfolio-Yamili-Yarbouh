/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";

const FilterTableDonantes = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    nombre: "",
    apellido: "",
    mail: "",
    telefono: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [id]: value,
      };
      onFilter(newFilters); // Enviar filtros al componente padre
      return newFilters;
    });
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      nombre: "",
      apellido: "",
      mail: "",
      telefono: "",
    };
    setFilters(clearedFilters);
    onFilter(clearedFilters);
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header" style={{ backgroundColor: "#ffccd5" }}>
          <h5>Buscar Donante</h5>
        </div>
        <div className="card-body">
          <form>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="mail" className="form-label">
                  Email:
                </label>
                <input
                  type="text"
                  id="mail"
                  className="form-control"
                  value={filters.mail}
                  onChange={handleInputChange}
                  style={{ backgroundColor: "#ffe4e1" }}
                  placeholder="Ingrese Email"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label">
                  Nombre:
                </label>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  value={filters.nombre}
                  onChange={handleInputChange}
                  style={{ backgroundColor: "#ffe4e1" }}
                  placeholder="Ingrese Nombre"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="apellido" className="form-label">
                  Apellido:
                </label>
                <input
                  type="text"
                  id="apellido"
                  className="form-control"
                  value={filters.apellido}
                  onChange={handleInputChange}
                  style={{ backgroundColor: "#ffe4e1" }}
                  placeholder="Ingrese Apellido"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="telefono" className="form-label">
                  Nro. Contacto:
                </label>
                <input
                  type="text"
                  id="telefono"
                  className="form-control"
                  value={filters.telefono}
                  onChange={handleInputChange}
                  style={{ backgroundColor: "#ffe4e1" }}
                  placeholder="Ingrese Nro. Contacto"
                />
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={handleClearFilters}
              >
                Limpiar Filtros
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FilterTableDonantes;
