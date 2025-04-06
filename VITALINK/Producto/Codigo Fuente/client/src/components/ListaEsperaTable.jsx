import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Loading from "./loading/Loading";
import Paginacion from "./paginacion/Paginacion";
import { useNavigate } from "react-router-dom";
import "../css/ListaEsperaTable.css"; 

const ListaEsperaTable = ({ listaEspera, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const esperaPerPage = 10;
  const navigate = useNavigate();

  const sortedListaEspera = listaEspera.sort((a, b) => {
    return b.menor - a.menor;
  });

  const indexOfLastEspera = currentPage * esperaPerPage;
  const indexOfFirstEspera = indexOfLastEspera - esperaPerPage;
  const currentEspera = sortedListaEspera.slice(indexOfFirstEspera, indexOfLastEspera);

  if (!listaEspera) {
    return <Loading />;
  }

  const navigateToNuevaEntrada = () => {
    const urlNuevaEntrada = "/registrarListaEspera";
    navigate(urlNuevaEntrada);
  };

  return (
    <div className="table-responsive"> 
      <div className="container mt-1">
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="flex-grow-1"></div>
          <button
            className="btn btn-success"
            style={{
              borderRadius: "20px",
              marginBottom: "20px",
              width: "200px",
            }}
            onClick={navigateToNuevaEntrada}
          >
            Nueva Entrada
          </button>
        </div>
        <div className="card">
          <div className="card-header">
            <h5>Lista de Espera</h5>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>NRO DE ORDEN</th>
                  <th>FECHA DE SOLICITUD</th>
                  <th>DNI</th>
                  <th>NOMBRE</th>
                  <th>APELLIDO</th>
                  <th>MENOR</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody className="table-group-divider table-divider-color">
                {currentEspera.map((espera) => (
                  <tr key={espera.nroOrden}>
                    <td>{espera.nroOrden}</td>
                    <td>
                      {(() => {
                        const fecha = new Date(espera.fechaSolicitud);
                        const fechaUTC = new Date(fecha.getUTCFullYear(), fecha.getUTCMonth(), fecha.getUTCDate());
                        return fechaUTC.toLocaleDateString("es-ES");
                      })()}
                    </td>
                    <td>{espera.clienteData.dni}</td>
                    <td>{espera.clienteData.nombre}</td>
                    <td>{espera.clienteData.apellido}</td>
                    <td>
                      {espera.menor ? (
                        <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
                      ) : (
                        <FontAwesomeIcon icon={faTimes} style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => onDelete(espera.nroOrden)}
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          padding: "10px 15px",
                          cursor: "pointer",
                          fontSize: "16px",
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <Paginacion
            totalItems={listaEspera.length}
            itemsPerPage={esperaPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ListaEsperaTable;
