import { useState, useEffect } from "react";

const FilterTablePrestamos = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    nroPrestamo: "",
    cliente: "",
    codPeluca: "",
    estado: "",
    dni: "", // Nuevo filtro
    fechaPrestamo: "", // Nuevo filtro
    fechaDevolucion: "", // Nuevo filtro
    vinculo: "", // Nuevo filtro
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Validaciones de entrada
    if (id === "nroPrestamo" || id === "codPeluca" || id === "dni") {
      // Permitir solo números
      if (!/^\d*$/.test(value)) return;
    } else if (id === "cliente") {
      // Permitir solo letras y espacios
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

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
      nroPrestamo: "",
      cliente: "",
      codPeluca: "",
      estado: "",
      dni: "",
      fechaPrestamo: "",
      fechaDevolucion: "",
      vinculo: "",
    };
    setFilters(resetFilters);
    onFilter(resetFilters); // Llama a la función de filtro con filtros vacíos
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
    <div className="container-fluid my-4">
      <div className="card">
        <div className="card-header" style={{ backgroundColor: "#ffccd5" }}>
          <h5>Buscar Préstamo de Peluca</h5>
        </div>
        <div className="card-body">
          <form>
            {/* Fila 1: Número de Préstamo, Fecha de Préstamo, Fecha de Devolución, Código de Peluca */}
            <div className="row mb-3">
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="nroPrestamo">Número de Préstamo:</label>
                  <input
                    type="text"
                    id="nroPrestamo"
                    className="form-control"
                    value={filters.nroPrestamo}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "#ffe4e1" }}
                    placeholder="Ingrese Número de Préstamo"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="fechaPrestamo">Fecha de Préstamo:</label>
                  <input
                    type="date"
                    id="fechaPrestamo"
                    className="form-control"
                    value={filters.fechaPrestamo}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "#ffe4e1" }}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="fechaDevolucion">Fecha Devolución:</label>
                  <input
                    type="date"
                    id="fechaDevolucion"
                    className="form-control"
                    value={filters.fechaDevolucion}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "#ffe4e1" }}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="codPeluca">Código de Peluca:</label>
                  <input
                    type="text"
                    id="codPeluca"
                    className="form-control"
                    value={filters.codPeluca}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "#ffe4e1" }}
                    placeholder="Ingrese Código de Peluca"
                  />
                </div>
              </div>
            </div>

            {/* Fila 2: DNI Cliente, Cliente */}
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="dni">DNI Cliente:</label>
                  <input
                    type="text"
                    id="dni"
                    className="form-control"
                    value={filters.dni}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "#ffe4e1" }}
                    placeholder="Ingrese DNI Cliente"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="cliente">Cliente:</label>
                  <input
                    type="text"
                    id="cliente"
                    className="form-control"
                    value={filters.cliente}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "#ffe4e1" }}
                    placeholder="Ingrese nombre del Cliente"
                  />
                </div>
              </div>
            </div>

            {/* Fila 3: Vínculo, Estado */}
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="vinculo">Vínculo:</label>
                  <select
                    className="form-control"
                    id="vinculo"
                    value={filters.vinculo}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "#ffe4e1" }}
                  >
                    <option value="">Seleccione Vínculo</option>
                    <option value="Madre">Madre</option>
                    <option value="Padre">Padre</option>
                    <option value="Tio">Tío</option>
                    <option value="Tia">Tía</option>
                    <option value="Hijo">Hijo</option>
                    <option value="Hija">Hija</option>
                    <option value="Paciente">Paciente</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="estado">Estado:</label>
                  <select
                    className="form-control"
                    id="estado"
                    value={filters.estado}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "#ffe4e1" }}
                  >
                    <option value="">Seleccione Estado</option>
                    <option value="En Prestamo">En Préstamo</option>
                    <option value="Devuelta">Devuelta</option>
                    <option value="Renovó">Renovó</option>
                    <option value="En Demora">En Demora</option>
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

export default FilterTablePrestamos;
