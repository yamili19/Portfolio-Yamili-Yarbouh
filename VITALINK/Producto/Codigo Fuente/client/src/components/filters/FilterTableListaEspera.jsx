import { useEffect, useState } from "react";
import "../../css/table.css";

const FilterTableListaEspera = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    fechaSolicitud: "",
    dni: "",
    nombre: "",
    apellido: "",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.10.2/mdb.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const newFilters = { ...filters, [id]: value };
    setFilters(newFilters);
    onFilter(newFilters); // Llama a la función onFilter con los nuevos filtros
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    const selectedDate = new Date(value);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      return;
    }

    const newFilters = { ...filters, fechaSolicitud: value };
    setFilters(newFilters);
    onFilter(newFilters); 
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      fechaSolicitud: "",
      dni: "",
      nombre: "",
      apellido: "",
    };
    setFilters(clearedFilters);
    onFilter(clearedFilters); 
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-pink text-white">
          <h5>Buscar en Lista de Espera</h5>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-3 position-relative">
              <div className="form-outline">
                <input
                  type="date"
                  id="fechaSolicitud"
                  className="form-control pink-input"
                  value={filters.fechaSolicitud}
                  onChange={handleDateChange}
                  max={new Date().toISOString().split("T")[0]} // Solo permite fechas hasta hoy
                  style={{ position: "relative", zIndex: 1 }}
                />
                {!filters.fechaSolicitud && (
                  <div
                    className="placeholder-text"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "10px",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#6c757d",
                    }}
                  >
                    dd/mm/aaaa
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-outline">
                <input
                  type="text"
                  id="dni"
                  className="form-control pink-input"
                  value={filters.dni}
                  onChange={handleInputChange}
                />
                <label className="form-label" htmlFor="dni">
                  DNI
                </label>
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-outline">
                <input
                  type="text"
                  id="nombre"
                  className="form-control pink-input"
                  value={filters.nombre}
                  onChange={handleInputChange}
                />
                <label className="form-label" htmlFor="nombre">
                  Nombre
                </label>
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-outline">
                <input
                  type="text"
                  id="apellido"
                  className="form-control pink-input"
                  value={filters.apellido}
                  onChange={handleInputChange}
                />
                <label className="form-label" htmlFor="apellido">
                  Apellido
                </label>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleClearFilters}
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTableListaEspera;
