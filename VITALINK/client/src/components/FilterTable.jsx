import { useEffect } from "react";
import "../css/table.css";

const FilterTable = () => {
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
  return (
    <>
      <div className="container mt-4">
        <div className="card">
          <div className="card-header">
            <h5>Buscar Peluquería</h5>
          </div>
          <div className="card-body">
            <form>
              <div className="row mb-3">
                {/* ID input */}
                <div className="col-md-4">
                  <div className="form-outline">
                    <input type="number" id="id" className="form-control" />
                    <label className="form-label" htmlFor="id">
                      ID
                    </label>
                  </div>
                </div>

                {/* Nombre input */}
                <div className="col-md-4">
                  <div className="form-outline">
                    <input type="text" id="nombre" className="form-control" />
                    <label className="form-label" htmlFor="nombre">
                      Nombre
                    </label>
                  </div>
                </div>

                {/* Contacto input */}
                <div className="col-md-4">
                  <div className="form-outline">
                    <input type="text" id="contacto" className="form-control" />
                    <label className="form-label" htmlFor="contacto">
                      Contacto
                    </label>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                {/* Número de Celular input */}
                <div className="col-md-4">
                  <div className="form-outline">
                    <input
                      type="number"
                      id="nroCelular"
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="nroCelular">
                      Número de Celular
                    </label>
                  </div>
                </div>

                {/* Dirección input */}
                <div className="col-md-4">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="direccion"
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="direccion">
                      Dirección
                    </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-outline">
                    <select className="form-select" id="barrio">
                      <option value="" disabled selected>
                        Seleccione Barrio
                      </option>
                      <option value="SAN VICENTE">SAN VICENTE</option>
                      <option value="NUEVA CORDOBA">NUEVA CORDOBA</option>
                      <option value="MAIPU">MAIPU</option>
                      <option value="LAS FLORES">LAS FLORES</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* Botón de Buscar */}
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Buscar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterTable;
