/* eslint-disable react/prop-types */

/**
 * Archivo para definir la estrucutra de la tabla de préstamos realizados
 */

import { useNavigate } from "react-router-dom";
import { showConfirmationAlert } from "../../utils/sweetAlertGeneralize";
import ConsultButton from "../buttons/ConsultButton";
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";
import Loading from "../loading/Loading";
import { useState } from "react";
import Paginacion from "../paginacion/Paginacion";

const PrestamoTable = ({ prestamos, resumenPrestamo, onDelete }) => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 10; // Máximo 10 por página

  const indexOfLastPrestamos = currentPage * itemsPerPage;
  const indexOfFirstPrestamos = indexOfLastPrestamos - itemsPerPage;
  const currentPrestamos = prestamos.slice(
    indexOfFirstPrestamos,
    indexOfLastPrestamos
  );

  // Función para determinar el color del estado del préstamo
  const getPrestamoEstadoColor = (estadoPrestamo) => {
    switch (estadoPrestamo) {
      case 1:
        return "bg-warning text-dark"; // Amarillo para "En Préstamo"
      case 2:
        return "bg-success text-white"; // Verde para "Devuelta"
      case 3:
        return "bg-pink text-white"; // Rosa para "Donada"
      case 4:
        return "bg-primary text-white"; // Azul para "Renovó"
      case 5:
        return "bg-danger text-white"; // Rojo para "En Demora"
      default:
        return "bg-secondary text-white"; // Gris para otros estados
    }
  };

  const formatDate = (dateStr) => {
    // Asumiendo que dateStr es en formato YYYY-MM-DD
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const navigateToEditPrestamo = (nroPrestamo) => {
    const urlEditPrestamo = "/prestamos/editar/";
    navigate(urlEditPrestamo + nroPrestamo);
  };

  const navigateToConsultPrestamo = (nroPrestamo) => {
    const urlConsultPrestamo = "/prestamos/consultar/";
    navigate(urlConsultPrestamo + nroPrestamo);
  };

  const navigateToRenovarPrestamo = (nroPrestamo) => {
    const urlRenovarPrestamo = "/prestamos/renovar/";
    navigate(urlRenovarPrestamo + nroPrestamo);
  };

  const navigateToRegisterPrestamo = () => {
    const urlRegisterPrestamo = "/registrarPrestamo/";
    navigate(urlRegisterPrestamo);
  };

  const navigateToClientes = () => {
    const urlClientes = "/clientes/";
    navigate(urlClientes);
  };

  const navigateToObrasSociales = () => {
    const urlObrasSociales = "/obrasSociales/";
    navigate(urlObrasSociales);
  };

  /**
   * Función para confirmar la eliminación de un préstamos
   * @param {*} nroPrestamo - Pasar el nroPrestamo del préstamo a eliminar
   */
  const confirmDeletePrestamo = (nroPrestamo) => {
    showConfirmationAlert("¿Desea eliminar este Préstamo?", () => {
      onDelete(nroPrestamo);
    });
  };

  if (!prestamos || !resumenPrestamo) {
    return <Loading></Loading>;
  }
  return (
    <>
      <div className="container-fluid my-2">
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
            onClick={() => navigateToRegisterPrestamo()}
          >
            Nuevo Prestamo
          </button>
          <button
            className="btn btn-warning"
            style={{
              borderRadius: "20px",
              marginBottom: "20px",
              width: "200px",
            }}
            onClick={() => navigateToClientes()}
          >
            Clientes
          </button>
          <button
            className="btn btn-info"
            style={{
              borderRadius: "20px",
              marginBottom: "20px",
              width: "200px",
            }}
            onClick={() => navigateToObrasSociales()}
          >
            Obras Sociales
          </button>
        </div>
        <div className="card mb-2">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <h5>Lista de Préstamos</h5>
              {resumenPrestamo && (
                <div className="d-flex align-items-center">
                  <span
                    className="badge rounded-pill bg-secondary text-white me-2"
                    style={{ fontSize: "0.85rem" }}
                  >
                    Total Préstamos: {resumenPrestamo.totalPrestamos}
                  </span>
                  <span
                    className="badge rounded-pill bg-warning text-dark me-2"
                    style={{ fontSize: "0.85rem" }}
                  >
                    En Préstamo: {resumenPrestamo.enPrestamo}
                  </span>
                  <span
                    className="badge rounded-pill bg-primary text-white me-2"
                    style={{ fontSize: "0.85rem" }}
                  >
                    Renovado: {resumenPrestamo.renovado}
                  </span>
                  <span
                    className="badge rounded-pill bg-danger text-white me-2"
                    style={{ fontSize: "0.85rem" }}
                  >
                    En Demora: {resumenPrestamo.enDemora}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="card-body">
            <table className="table table-hover w-100 table-responsive">
              <thead>
                <tr>
                  <th style={{ width: "3%" }}>NRO. PRESTAMO</th>
                  <th style={{ width: "5%" }}>FECHA PRESTAMO</th>
                  <th style={{ width: "10%" }}>CLIENTE</th>
                  <th style={{ width: "5%" }}>VINCULO</th>
                  <th style={{ width: "3%" }}>PELUCA</th>
                  <th style={{ width: "5%" }}>AFILIACION</th>
                  <th style={{ width: "5%" }}>FECHA DEVOLUCION</th>
                  <th style={{ width: "10%" }}>ESTADO PRESTAMO</th>
                  <th style={{ width: "15%" }}>ACCIONES</th>
                  <th style={{ width: "5%" }}>RENOVAR</th>
                </tr>
              </thead>
              <tbody className="table-group-divider table-divider-color">
                {currentPrestamos.map((prestamo) => (
                  <tr key={prestamo.nroPrestamo}>
                    <td>{prestamo.nroPrestamo}</td>
                    <td>{formatDate(prestamo.fechaPrestamo)}</td>
                    <td style={{ fontSize: "0.85rem" }}>
                      {`${prestamo.dni} - ${prestamo.cliente.apellido}, ${prestamo.cliente.nombre}`}
                    </td>
                    <td style={{ fontSize: "0.85rem" }}>
                      {prestamo.Vinculo.nombre}
                    </td>
                    <td
                      style={{ fontSize: "0.85rem" }}
                    >{`Cod: ${prestamo.Peluca.codigo}`}</td>
                    <td style={{ fontSize: "0.85rem" }}>
                      {prestamo.afiliado && prestamo.afiliado.obraSocialData
                        ? prestamo.afiliado.obraSocialData.nombre
                        : "-"}
                    </td>
                    <td>{formatDate(prestamo.fechaDevolucion)}</td>
                    <td>
                      <span
                        className={`badge rounded-pill ${getPrestamoEstadoColor(
                          prestamo.estadoPrestamo
                        )}`}
                        style={{ fontSize: "0.75rem" }}
                      >
                        {prestamo.EstadoPrestamo.nombre}
                      </span>
                    </td>
                    <td>
                      <ConsultButton
                        onClick={() =>
                          navigateToConsultPrestamo(prestamo.nroPrestamo)
                        }
                      ></ConsultButton>
                      {Number(prestamo.estadoPrestamo) !== 2 &&
                        //Number(prestamo.estadoPrestamo) !== 4 &&
                        //Number(prestamo.estadoPrestamo) !== 5 && 
                        (
                          <EditButton
                            onClick={() =>
                              navigateToEditPrestamo(prestamo.nroPrestamo)
                            }
                          />
                        )}
                      <DeleteButton
                        onClick={() =>
                          confirmDeletePrestamo(prestamo.nroPrestamo)
                        }
                      ></DeleteButton>
                    </td>
                    <td>
                      {Number(prestamo.estadoPrestamo) !== 2 && (
                        <button
                          className="btn btn-primary btn-sm"
                          style={{ borderRadius: "20px" }}
                          onClick={() =>
                            navigateToRenovarPrestamo(prestamo.nroPrestamo)
                          }
                        >
                          Renovar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Componente de Paginación centrado debajo de la lista de préstamos */}
        <div className="d-flex justify-content-center mt-4">
          <Paginacion
            totalItems={prestamos.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default PrestamoTable;
