const FilterTablePelucas = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: value,
    }));
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h5>Buscar Pelucas</h5>
        </div>
        <div className="card-body">
          <form>
            <div className="row mb-3">
              {/* Código input (solo números) */}
              <div className="col-md-6">
                <div className="form-outline">
                  <input
                    type="text"
                    id="codigo"
                    className="form-control"
                    value={filters.codigo}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleChange(e);
                      }
                    }}
                    style={{ backgroundColor: "#ffe4e1" }}
                  />
                  <label className="form-label" htmlFor="codigo">
                    Código
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-outline">
                  <input
                    type="text"
                    id="colorPelo"
                    className="form-control"
                    value={filters.colorPelo}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^[a-zA-Z]*$/.test(value)) {
                        handleChange(e);
                      }
                    }}
                    style={{ backgroundColor: "#ffe4e1" }}
                  />
                  <label className="form-label" htmlFor="colorPelo">
                    Color de Pelo
                  </label>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              {/* Talle select */}
              <div className="col-md-4">
                <div className="form-outline">
                  <select
                    className="form-select"
                    id="talle"
                    value={filters.talle}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione Talle</option>
                    <option value="XL">XL</option>
                    <option value="L">L</option>
                    <option value="M">M</option>
                    <option value="S">S</option>
                    <option value="XS">XS</option>
                  </select>
                </div>
              </div>

              {/* Estado de Peluca select */}
              <div className="col-md-4">
                <div className="form-outline">
                  <select
                    className="form-select"
                    id="estado"
                    value={filters.estado}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione Estado</option>
                    <option value="Nueva">Nueva</option>
                    <option value="Usada">Usada</option>
                    <option value="Rota">Rota</option>
                  </select>
                </div>
              </div>
              {/* Tipo de Pelo select */}
              <div className="col-md-4">
                <div className="form-outline">
                  <select
                    className="form-select"
                    id="tipoPelo"
                    value={filters.tipoPelo}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione Tipo de Pelo</option>
                    <option value="Lacio">Lacio</option>
                    <option value="Ruludo">Ruludo</option>
                    <option value="Ondulado">Ondulado</option>
                    <option value="Rizado">Rizado</option>
                    <option value="Afro">Afro</option>
                  </select>
                </div>
              </div>

              {/* Color de Pelo input (solo letras) */}
            </div>

            {/* Botón Limpiar */}
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={() => {
                  setFilters({
                    codigo: "",
                    talle: "",
                    estado: "",
                    tipoPelo: "",
                    colorPelo: "",
                  });
                }}
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

export default FilterTablePelucas;
