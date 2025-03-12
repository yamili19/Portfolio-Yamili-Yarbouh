/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import imgNullPeluca from "../../assets/images/img-null-peluca-removebg.png";
import Loading from "../loading/Loading";

const PrestamoEstructuraConsult = ({ prestamo }) => {
  const navigate = useNavigate();
  if (!prestamo) {
    return <Loading></Loading>;
  }
  const {
    nroPrestamo,
    cliente,
    Peluca,
    fechaPrestamo,
    fechaDevolucion,
    EstadoPrestamo,
    Vinculo,
    afiliado,
  } = prestamo;

  const returnToListPrestamos = () => {
    navigate("/prestamos");
  };

  const formatDate = (dateStr) => {
    // Asumiendo que dateStr es en formato YYYY-MM-DD
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  // Lógica para calcular el progreso
  const calcularProgreso = () => {
    const totalDias = new Date(fechaDevolucion) - new Date(fechaPrestamo);
    const diasRestantes = new Date() - new Date(fechaPrestamo);
    const porcentaje = Math.min((diasRestantes / totalDias) * 100, 100);
    return porcentaje.toFixed(0);
  };

  // Lógica para obtener el color basado en el estado del préstamo
  const obtenerColorEstado = (estado) => {
    switch (estado) {
      case 1:
        return "#ffc107"; // Amarillo para "En Préstamo"
      case 2:
        return "#28a745"; // Verde para "Devuelta"
      case 4:
        return "#007bff"; // Azul para "Renovó"
      case 5:
        return "#dc3545"; // Rojo para "En Demora"
      default:
        return "#6c757d"; // Gris para otros estados
    }
  };

  const progreso = calcularProgreso();
  const colorEstado = obtenerColorEstado(prestamo.estadoPrestamo);
  return (
    <section className="h-100 gradient-custom">
      <div className="container py-3 h-100 mt-2 mb-2">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-10 col-xl-8">
            <div className="card" style={{ borderRadius: "10px" }}>
              <div className="card-header px-4 py-5 d-flex justify-content-between align-items-center">
                <h5 className="text-muted mb-0">
                  Detalles del Préstamo para{" "}
                  <span style={{ color: "#a8729a" }}>
                    {cliente.apellido} {cliente.nombre}
                  </span>
                </h5>
                <button
                  className="btn btn-primary"
                  title="Volver al listado de Préstamos"
                  onClick={() => returnToListPrestamos()}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
              </div>
              <div
                className="card-body p-4"
                style={{ backgroundColor: "#f8e5f1" }}
              >
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p
                    className="lead fw-normal mb-0"
                    style={{ color: "#a8729a" }}
                  >
                    Préstamo N° {nroPrestamo}
                  </p>
                  <p className="small text-muted mb-0">
                    Vínculo: {Vinculo.nombre}
                  </p>
                </div>
                <div className="card shadow-0 border mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-2">
                        <img
                          src={
                            Peluca.foto && Peluca.foto.trim()
                              ? `http://localhost:8000/${Peluca.foto.replace(
                                  /\\/g,
                                  "/"
                                )}`
                              : imgNullPeluca
                          }
                          className="img-fluid"
                          alt={`Peluca ${Peluca.codigo}`}
                        />
                      </div>
                      <div className="col-md-4 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0">
                          Peluca: {Peluca.codigo} ({Peluca.talle},{" "}
                          {Peluca.color})
                        </p>
                      </div>
                      <div className="col-md-6 text-center d-flex justify-content-center align-items-center">
                        <p className="text-muted mb-0 small">
                          Fecha de Préstamo: {formatDate(fechaPrestamo)}
                        </p>
                      </div>
                    </div>
                    <hr
                      className="mb-4"
                      style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                    />
                    <div className="row d-flex align-items-center">
                      <div className="col-md-2">
                        <p className="text-muted mb-0 small">Progreso</p>
                      </div>
                      <div className="col-md-10">
                        <div
                          className="progress"
                          style={{
                            height: "10px",
                            borderRadius: "16px",
                            border: "1px solid black",
                            position: "relative", // Necesario para la posición absoluta del porcentaje
                          }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${progreso}%`,
                              borderRadius: "16px",
                              backgroundColor: colorEstado,
                              position: "relative", // Necesario para el centrado del texto
                            }}
                            aria-valuenow={progreso}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <span
                              className="progress-bar-label"
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                color: "black",
                                fontWeight: "bold",
                              }}
                            >
                              {progreso}%
                            </span>
                          </div>
                        </div>
                        <div className="d-flex justify-content-around mb-1">
                          <p className="text-muted mt-1 mb-0 small ms-xl-5">
                            Iniciado
                          </p>
                          <p className="text-muted mt-1 mb-0 small ms-xl-5">
                            Devolución
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between pt-2">
                  <p className="fw-bold mb-0">Estado del Préstamo:</p>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: colorEstado,
                      borderRadius: "4px",
                      color: "#fff",
                    }}
                  >
                    <p className="text-white mb-0">{EstadoPrestamo.nombre}</p>
                  </div>
                </div>

                <div className="d-flex justify-content-between pt-2">
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">Fecha de Devolución:</span>{" "}
                    {formatDate(fechaDevolucion)}
                  </p>
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">Obra Social:</span>{" "}
                    {afiliado.obraSocialData.nombre}
                  </p>
                </div>

                <div className="d-flex justify-content-between pt-2">
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">DNI:</span> {cliente.dni}
                  </p>
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">Teléfono:</span>{" "}
                    {cliente.nroTelefono}
                  </p>
                </div>

                <div className="d-flex justify-content-between pt-2">
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">Ciudad:</span>{" "}
                    {cliente.ciudadClienteData.nombre}
                  </p>
                </div>
              </div>
              <div
                className="card-footer border-0 px-4 py-5"
                style={{
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                  backgroundColor: colorEstado,
                }}
              >
                <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                  Estado:{" "}
                  <span className="h2 mb-0 ms-2">{EstadoPrestamo.nombre}</span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrestamoEstructuraConsult;
