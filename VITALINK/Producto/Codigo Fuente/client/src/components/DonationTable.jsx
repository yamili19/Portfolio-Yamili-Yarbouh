/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import EditButton from "./buttons/EditButton";
import DeleteButton from "./buttons/DeleteButton";
import { showConfirmationAlert } from "../utils/sweetAlertGeneralize";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "./loading/Loading";
import Paginacion from "./paginacion/Paginacion";
import PropTypes from 'prop-types';

const DonationTable = ({ donaciones, onDelete }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const donacionesPerPage = 10;

  const handleDeleteDonacion = (fecha) => {
    showConfirmationAlert("¿Desea eliminar está Donación?", () => {
      onDelete(fecha);
    });
  };

  const navigateToEditDonacion = (fechaDonacion) => {
    const urlEditDonacion = "/donaciones/editar/";
    navigate(urlEditDonacion + fechaDonacion);
  };

  const navigateToRegisterDonacion = () => {
    const urlRegisterDonacion = "/registrarDonacion/";
    navigate(urlRegisterDonacion);
  };

  const navigateToDonantes = () => {
    const urlDonantes = "/donantes/";
    navigate(urlDonantes);
  };

  // Calculate pagination
  const indexOfLastDonacion = currentPage * donacionesPerPage;
  const indexOfFirstDonacion = indexOfLastDonacion - donacionesPerPage;
  const currentDonaciones = donaciones.slice(
    indexOfFirstDonacion,
    indexOfLastDonacion
  );

  if (!donaciones) {
    return <Loading />;
  }


  return (
    <div className="container mt-1">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <div className="flex-grow-1"></div>
        <button
          className="btn btn-success"
          style={{
            borderRadius: "20px",
            marginBottom: "20px",
            marginRight: "10px",
            width: "200px",
          }}
          onClick={navigateToRegisterDonacion}
        >
          Registrar Donación
        </button>
        <button
          className="btn btn-warning"
          style={{
            borderRadius: "20px",
            marginBottom: "20px",
            width: "200px",
          }}
          onClick={navigateToDonantes}
        >
          Donantes
        </button>
      </div>

      
      <div className="card">
        <div className="card-header">
          <h5>Lista de Donaciones</h5>
        </div>
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>FECHA</th>
                <th>EMAIL DONANTE</th>
                <th>PELUQUERÍA</th>
                <th>DONANTE</th>
                <th>TELÉFONO</th>
                <th>NOTIFICADO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody className="table-group-divider table-divider-color">
              {currentDonaciones.map((donacion) => {
                const donante = donacion.donante || {};
                return (
                  <tr key={donacion.fecha}>
                    <td>
                      {new Date(donacion.fecha).toLocaleDateString("es-ES")}
                    </td>
                    <td>{donacion.mail}</td>
                    <td>{donacion.entidad || 'N/A'}</td>
                    <td>
                      {donante.apellido || donante.nombre 
                        ? `${donante.apellido || ''}, ${donante.nombre || ''}`
                        : 'N/A'}
                    </td>
                    <td>{donante.telefono || 'N/A'}</td>
                    <td>
                      {donacion.mailEnviado ? (
                        <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
                      ) : (
                        <FontAwesomeIcon icon={faTimes} style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <EditButton
                        onClick={() => navigateToEditDonacion(donacion.fecha)}
                      />
                      <DeleteButton
                        onClick={() => handleDeleteDonacion(donacion.fecha)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Paginacion
          totalItems={donaciones.length}
          itemsPerPage={donacionesPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

DonationTable.propTypes = {
  donaciones: PropTypes.arrayOf(
    PropTypes.shape({
      fecha: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
      mail: PropTypes.string.isRequired,
      entidad: PropTypes.string,
      mailEnviado: PropTypes.bool,
      Donante: PropTypes.shape({
        nombre: PropTypes.string,
        apellido: PropTypes.string,
        telefono: PropTypes.string
      })
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired
};

DonationTable.defaultProps = {
  donaciones: []
};

export default DonationTable;