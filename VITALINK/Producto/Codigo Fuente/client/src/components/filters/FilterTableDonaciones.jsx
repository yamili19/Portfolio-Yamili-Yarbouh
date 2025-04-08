import { useEffect, useState } from "react";
import "../../css/table.css";

const FilterTableDonaciones = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    fecha: "",
    emailDonante: "",
    peluqueria: "",
    donante: "",
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

    // Validación para no permitir una fecha mayor a la actual
    if (selectedDate > currentDate) {
      return;
    }

    const newFilters = { ...filters, fecha: value };
    setFilters(newFilters);
    onFilter(newFilters); // Llama a la función onFilter con los nuevos filtros
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      fecha: "",
      emailDonante: "",
      peluqueria: "",
      donante: "",
    };
    setFilters(clearedFilters);
    onFilter(clearedFilters); // Llama a la función onFilter con filtros vacíos
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-pink text-white">
          <h5>Buscar Donaciones</h5>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-3 position-relative">
              <div className="form-outline">
                <input
                  type="date"
                  id="fecha"
                  className="form-control pink-input"
                  value={filters.fecha}
                  onChange={handleDateChange}
                  max={new Date().toISOString().split("T")[0]} // Solo permite fechas hasta hoy
                  style={{ position: "relative", zIndex: 1 }}
                />
                {!filters.fecha && (
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
                  id="emailDonante"
                  className="form-control pink-input"
                  value={filters.emailDonante}
                  onChange={handleInputChange}
                />
                <label className="form-label" htmlFor="emailDonante">
                  Email del Donante
                </label>
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-outline">
                <input
                  type="text"
                  id="peluqueria"
                  className="form-control pink-input"
                  value={filters.peluqueria}
                  onChange={handleInputChange}
                />
                <label className="form-label" htmlFor="peluqueria">
                  Peluquería
                </label>
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-outline">
                <input
                  type="text"
                  id="donante"
                  className="form-control pink-input"
                  value={filters.donante}
                  onChange={handleInputChange}
                />
                <label className="form-label" htmlFor="donante">
                  Donante
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

export default FilterTableDonaciones;