/* eslint-disable react/prop-types */

/**
 * Archivo que se usa para mostrar el listado de las pelucas recomendadas en base al tipo de cara
 */

import imgNullPeluca from "../../assets/images/img-null-peluca-removebg.png";

const PelucaRecomendada = ({ pelucasRecomendas }) => {
  return (
    <div className="container mb-2 mt-2">
      {/* Título general */}
      <h2 className="text-center mb-5" style={{ color: "fuchsia" }}>
        Pelucas Recomendadas
      </h2>

      {/* Contenedor de las pelucas con fondo rosa claro */}
      <div
        className="row"
        style={{
          border: "2px solid fuchsia",
          borderRadius: "10px",
          padding: "20px",
          backgroundColor: "#ffe6f0", // Color de fondo rosa claro
        }}
      >
        {pelucasRecomendas.map((peluca) => (
          <div className="col-md-12 col-lg-4 mb-4 mb-lg-0" key={peluca.codigo}>
            <div
              className="card peluca-card"
              style={{
                minHeight: "400px", // Establecer la altura mínima para que todas las tarjetas tengan el mismo tamaño
                border: "2px solid fuchsia",
                borderRadius: "10px",
                backgroundColor: "white", // Fondo blanco por defecto
              }}
            >
              {/* Parte superior con disponibilidad */}
              <div className="d-flex justify-content-between p-3">
                <p className="lead mb-0">Disponibilidad:</p>
                <div
                  className={`${
                    peluca.estaDisponible ? "bg-success" : "bg-danger"
                  } rounded-circle d-flex align-items-center justify-content-center shadow-1-strong`}
                  style={{ width: "100px", height: "35px" }}
                >
                  <p className="text-white mb-0 small">
                    {peluca.estaDisponible ? "Disponible" : "No Disponible"}
                  </p>
                </div>
              </div>

              {/* Mostrar el código de la peluca */}
              <div className="text-center">
                <p className="small mb-0">
                  <strong style={{ color: "fuchsia" }}>Peluca Código:</strong>{" "}
                  <span style={{ color: "fuchsia" }}>{peluca.codigo}</span>
                </p>
              </div>

              {/* Línea de separación fucsia */}
              <hr style={{ borderTop: "3px solid fuchsia", margin: "0" }} />

              {/* Imagen de la peluca */}
              <img
                src={
                  peluca.foto && peluca.foto.trim()
                    ? `http://localhost:8000/${peluca.foto.replace(/\\/g, "/")}`
                    : imgNullPeluca
                }
                alt={`Peluca - ${peluca.codigo}`}
                className="card-img-top"
                style={{ objectFit: "cover", height: "250px" }} // Ajustar el tamaño de la imagen
              />

              {/* Línea de separación fucsia */}
              <hr style={{ borderTop: "3px solid fuchsia", margin: "0" }} />

              {/* Información de la peluca */}
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <p className="small">
                    <span className="text-muted">
                      <strong>Talle:</strong> {peluca.talle}
                    </span>
                  </p>
                  <p className="small">
                    <span className="text-muted">
                      <strong>Color:</strong> {peluca.color}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estilos en línea para el hover */}
      <style>
        {`
          .peluca-card:hover {
            background-color: #ffccda !important; /* Cambiar el color de fondo al pasar el mouse */
            transition: background-color 0.3s ease; /* Suavizar la transición */
          }
        `}
      </style>
    </div>
  );
};

export default PelucaRecomendada;
