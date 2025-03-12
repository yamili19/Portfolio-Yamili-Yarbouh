/* eslint-disable react/prop-types */

/**
 * Archivo jsx que representa la estructura de la lista de donaciones realizadas
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import EditButton from "./buttons/EditButton";
import DeleteButton from "./buttons/DeleteButton";
import { showConfirmationAlert } from "../utils/sweetAlertGeneralize";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "./loading/Loading";
import Paginacion from "./paginacion/Paginacion";

const DonationTable = ({ donaciones, onDelete }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const donacionesPerPage = 10; // Número de donaciones por página
  /**
   * Manejador para eliminar una donación
   * @param {*} fecha - Pasar la fecha del la donación a realizar
   */
  const handleDeleteDonacion = (fecha) => {
    showConfirmationAlert("¿Desea eliminar está Donación?", () => {
      onDelete(fecha);
    });
  };

  const navigateToEditDonacion = (fechaDonacion) => {
    console.log("fecha de la donacion a editar: ", fechaDonacion.toString());
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

  // Calcular el rango de donaciones a mostrar en la página actual
  const indexOfLastDonacion = currentPage * donacionesPerPage;
  const indexOfFirstDonacion = indexOfLastDonacion - donacionesPerPage;
  const currentDonaciones = donaciones.slice(
    indexOfFirstDonacion,
    indexOfLastDonacion
  );

  // Cambiar de página
  //const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generar números de página
  /*
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(donaciones.length / donacionesPerPage); i++) {
    pageNumbers.push(i);
  }
    */

  if (!donaciones) {
    return <Loading></Loading>;
  }

  return (
    <>
      <div className="container mt-1">
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="flex-grow-1"></div>{" "}
          {/* Espaciador para empujar el botón a la derecha */}
          <button
            className="btn btn-success"
            style={{
              borderRadius: "20px",
              marginBottom: "20px",
              marginRight: "10px",
              width: "200px",
            }}
            onClick={() => navigateToRegisterDonacion()}
          >
            Registrar Donacion
          </button>
          <button
            className="btn btn-warning"
            style={{
              borderRadius: "20px",
              marginBottom: "20px",
              width: "200px",
            }}
            onClick={() => navigateToDonantes()}
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
                  <th>PELUQUERIA</th>
                  <th>DONANTE</th>
                  <th>TELEFONO</th>
                  <th>NOTIFICADO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody className="table-group-divider table-divider-color">
                {currentDonaciones.map((donacion) => (
                  <tr key={donacion.fecha}>
                    {console.log("Dato de la donacion: ", donacion)}
                    <td>
                      {new Date(donacion.fecha).toLocaleDateString("es-ES")}
                    </td>
                    <td>{donacion.mail}</td>
                    <td>{donacion.entidad}</td>
                    <td>{`${donacion.Donante.apellido}, ${donacion.Donante.nombre}`}</td>
                    <td>{donacion.Donante.telefono}</td>
                    <td>
                      {donacion.mailEnviado ? (
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{ color: "green" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faTimes}
                          style={{ color: "red" }}
                        />
                      )}
                    </td>
                    <td>
                      <EditButton
                        onClick={() => navigateToEditDonacion(donacion.fecha)}
                      ></EditButton>
                      <DeleteButton
                        onClick={() => handleDeleteDonacion(donacion.fecha)}
                      ></DeleteButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Componente de Paginación centrado debajo de la lista de donaciones */}
        <div className="d-flex justify-content-center mt-4">
          <Paginacion
            totalItems={donaciones.length}
            itemsPerPage={donacionesPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default DonationTable;
