/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import imgNullPeluca from "../../assets/images/img-null-peluca-removebg.png";
import "../../css/pelucaConsult.css";
import Loading from "../loading/Loading";

const PelucaEstructuraConsult = ({ peluca }) => {
  const navigate = useNavigate();
  if (!peluca) {
    return <Loading></Loading>;
  }
  console.log("Datos de la peluca: ", peluca);
  // Definir colores de fondo para el estado de la peluca
  const getEstadoColor = (estadoNombre) => {
    switch (estadoNombre) {
      case "Nueva":
        return "bg-success text-white"; // Verde para Nueva
      case "Usada":
        return "bg-warning text-dark"; // Amarillo para Usada
      case "Rota":
        return "bg-danger text-white"; // Rojo para Rota
      default:
        return "bg-secondary text-white"; // Gris por defecto
    }
  };

  const formatDate = (dateStr) => {
    // Asumiendo que dateStr es en formato YYYY-MM-DD
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const returnToInventoryPeluca = () => {
    const urlInventarioPelucas = "/pelucas";
    navigate(urlInventarioPelucas);
  };
  return (
    <div className="modal-overlay">
      <div className="modal-card card text-center">
        <div
          className="bg-image hover-overlay ripple card-img-container"
          data-mdb-ripple-color="light"
        >
          <img
            src={
              peluca.foto && peluca.foto.trim()
                ? `http://localhost:8000/${peluca.foto.replace(/\\/g, "/")}`
                : imgNullPeluca
            }
            className="img-fluid card-img"
            alt={`Peluca de código ${peluca.codigo}`}
          />
        </div>

        <div className="card-header fuchsia-text">
          <strong>Peluca Código:</strong> <strong>{peluca.codigo}</strong>
        </div>

        <div className="card-body">
          <h5 className="card-title">Detalles de la Peluca</h5>
          <p className="card-text peluca-info">
            <span>
              <strong>Talle:</strong> {peluca.talle}
            </span>{" "}
            <br />
            <span>
              <strong>Color:</strong> {peluca.color}
            </span>{" "}
            <br />
            <span>
              <strong>Tipo de Pelo:</strong> {peluca.tipoDePelo.descripcion}
            </span>{" "}
            <br />
            <span>
              <strong>Fecha de Confección:</strong>{" "}
              {formatDate(peluca.fechaConfeccion)}
            </span>{" "}
            <br />
            {peluca.tiposCara && peluca.tiposCara.length > 0 && (
              <span>
                <strong>Tipos de Cara Recomendada:</strong>{" "}
                {peluca.tiposCara.join(", ")}
              </span>
            )}
            <br />
          </p>
          {peluca.descripcion && (
            <div className="peluca-descripcion">
              <strong>Descripción:</strong>
              <p>{peluca.descripcion}</p>
            </div>
          )}

          <div
            className={`card-footer ${getEstadoColor(peluca.estado.nombre)}`}
          >
            <span className="card-footer-span">
              Estado: {peluca.estado.nombre}
            </span>
          </div>

          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => returnToInventoryPeluca()}
              style={{ marginTop: "10px" }} // Ajuste adicional
            >
              Ir al Inventario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PelucaEstructuraConsult;
