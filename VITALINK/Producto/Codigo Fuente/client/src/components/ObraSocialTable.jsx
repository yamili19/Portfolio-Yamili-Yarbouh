/* eslint-disable react/prop-types */

//Archivo que representa la estructura de la lista de obras sociales asociadas

import "../css/listTable.css";
import EditButton from "./buttons/EditButton";
import DeleteButton from "./buttons/DeleteButton";
import { showConfirmationAlert } from "../utils/sweetAlertGeneralize";
import { useNavigate } from "react-router-dom";

const ObraSocialTable = ({ obras, onDelete }) => {
  const navigate = useNavigate();

  /**
   * Pasar el id de la Obra Social a eliminar
   * @param {*} id
   */
  const confirmDelete = (id) => {
    showConfirmationAlert("¿Desea eliminar esta Obra Social?", () => {
      onDelete(id);
    });
  };

  const navigateToEdit = (id) => {
    const urlObraSocialEdit = "/obrasSociales/editar/";
    navigate(urlObraSocialEdit + id);
  };

  const navigateToRegisterObraSocial = () => {
    const urlRegisterObraSocial = "/registrarObraSocial/";
    navigate(urlRegisterObraSocial);
  };

  return (
    <>
      <div className="container mt-4">
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
            onClick={() => navigateToRegisterObraSocial()}
          >
            Añadir Obra Social
          </button>
        </div>
        <div className="card mb-2">
          <div className="card-header">
            <h5>Lista de Obras Sociales</h5>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NOMBRE</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody className="table-group-divider table-divider-color">
                {obras.map((obra) => (
                  <tr key={obra.id}>
                    <td>{obra.id}</td>
                    <td>{obra.nombre}</td>
                    <td>
                      <EditButton
                        onClick={() => navigateToEdit(obra.id)}
                      ></EditButton>
                      <DeleteButton
                        onClick={() => confirmDelete(obra.id)}
                      ></DeleteButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ObraSocialTable;
