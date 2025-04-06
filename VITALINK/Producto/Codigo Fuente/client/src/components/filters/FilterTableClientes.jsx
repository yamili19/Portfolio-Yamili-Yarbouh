/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";

const FilterTableClientes = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    nroTelefono: "",
    ciudad: "",
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
      dni: "",
      nroTelefono: "",
      ciudad: "",
    };
    setFilters(clearedFilters);
    onFilter(clearedFilters);
  };

  // Efecto para forzar la actualización de los labels usando form-group
  useEffect(() => {
    setTimeout(() => {
      const formGroups = document.querySelectorAll(".form-group");

      formGroups.forEach((formGroup) => {
        const input = formGroup.querySelector("input, select, textarea");
        const label = formGroup.querySelector("label");

        if (input && label) {
          if (input.value) {
            label.classList.add("active"); // Añadir clase "active" al label
          } else {
            label.classList.remove("active");
          }
        }
      });
    }, 0);
  }, [filters]);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header" style={{ backgroundColor: "#ffccd5" }}>
          <h5>Buscar Cliente</h5>
        </div>
        <div className="card-body">
          <form>
            {/* Fila 1: DNI y Nombre */}
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="dni" className="form-label">
                    DNI:
                  </label>
                  <input
                    type="text"
                    id="dni"
                    className="form-control"
                    value={filters.dni}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "#ffe4e1" }}
                    placeholder="Ingrese DNI"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
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
            </div>

            {/* Fila 2: Apellido y Ciudad */}
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-group">
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
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="ciudad" className="form-label">
                    Ciudad:
                  </label>
                  <input
                    type="text"
                    id="ciudad"
                    className="form-control"
                    value={filters.ciudad}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "#ffe4e1" }}
                    placeholder="Ingrese Ciudad"
                  />
                </div>
              </div>
            </div>

            {/* Fila 3: Nro Teléfono */}
            <div className="row mb-3">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="nroTelefono" className="form-label">
                    Nro Teléfono:
                  </label>
                  <input
                    type="text"
                    id="nroTelefono"
                    className="form-control"
                    value={filters.nroTelefono}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "#ffe4e1" }}
                    placeholder="Ingrese Nro Teléfono"
                  />
                </div>
              </div>
            </div>

            {/* Botón para Limpiar Filtros */}
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

export default FilterTableClientes;
