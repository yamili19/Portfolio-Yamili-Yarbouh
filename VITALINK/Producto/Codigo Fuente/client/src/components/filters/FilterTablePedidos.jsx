import { useState, useEffect } from "react";

const FilterTablePedidos = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    fechaInicio: "",
    fechaFin: "",
    pedidoObtenido: "", // Puede ser "si", "no" o vacío
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [id]: value,
      };
      onFilter(updatedFilters); // Llama a la función de filtro cada vez que cambia un campo
      return updatedFilters;
    });
  };

  const handleClearFilters = () => {
    const resetFilters = {
      fechaInicio: "",
      fechaFin: "",
      pedidoObtenido: "",
    };
    setFilters(resetFilters);
    onFilter(resetFilters); // Llama a la función de filtro con filtros vacíos
  };

  // Efecto para forzar la actualización de los labels usando form-group
  useEffect(() => {
    setTimeout(() => {
      const formGroups = document.querySelectorAll(".form-group");

      formGroups.forEach((formGroup) => {
        const input = formGroup.querySelector("input, select");
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
          <h5>Buscar Pedido de Peluca</h5>
        </div>
        <div className="card-body">
          <form>
            {/* Fila 1: Fecha de Inicio, Fecha de Fin */}
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="fechaInicio">Fecha de Inicio:</label>
                  <input
                    type="date"
                    id="fechaInicio"
                    className="form-control"
                    value={filters.fechaInicio}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "#ffe4e1" }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="fechaFin">Fecha de Fin:</label>
                  <input
                    type="date"
                    id="fechaFin"
                    className="form-control"
                    value={filters.fechaFin}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "#ffe4e1" }}
                  />
                </div>
              </div>
            </div>

            {/* Fila 2: Pedido Obtenido */}
            <div className="row mb-3">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="pedidoObtenido">Pedido Obtenido:</label>
                  <select
                    className="form-control"
                    id="pedidoObtenido"
                    value={filters.pedidoObtenido}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "#ffe4e1" }}
                  >
                    <option value="">Seleccione</option>
                    <option value="Obtenido">Obtenido</option>
                    <option value="No obtenido">No Obtenido</option>
                  </select>
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

export default FilterTablePedidos;
