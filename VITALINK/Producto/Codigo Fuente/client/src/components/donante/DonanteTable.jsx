/* eslint-disable react/prop-types */

import { useState } from "react";
import FilterTableDonantes from "../filters/FilterTableDonantes";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";
import { useNavigate } from "react-router-dom";

const DonanteTable = ({ donantes }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    mail: "",
    apellido: "",
    nombre: "",
    telefono: "",
  });

  // Función para manejar la aplicación de filtros
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Función para aplicar filtros a la lista de donantes
  const filteredDonantes = donantes.filter((donante) => {
    return (
      (filters.mail === "" || donante.mail.includes(filters.mail)) &&
      (filters.apellido === "" ||
        donante.apellido
          .toLowerCase()
          .includes(filters.apellido.toLowerCase())) &&
      (filters.nombre === "" ||
        donante.nombre.toLowerCase().includes(filters.nombre.toLowerCase())) &&
      (filters.telefono === "" || donante.telefono.includes(filters.telefono))
    );
  });

  const navigateToRegisterDonacion = () => {
    const urlRegisterDonacion = "/registrarDonacion/";
    navigate(urlRegisterDonacion);
  };

  const navigateToDonaciones = () => {
    const urlDonaciones = "/donaciones/";
    navigate(urlDonaciones);
  };

  return (
    <>
      {/* Componente de Filtros */}
      <FilterTableDonantes onFilter={handleFilterChange} />

      {/* Botones de acción */}
      <div className="container mt-4 mb-4">
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
            Registrar Donacion
          </button>
          <button
            className="btn btn-warning"
            style={{
              borderRadius: "20px",
              marginBottom: "20px",
              width: "200px",
            }}
            onClick={navigateToDonaciones}
          >
            Donaciones
          </button>
        </div>

        {/* Tabla de Donantes */}
        <div className="card">
          <div className="card-header">
            <h5>Lista de Donantes</h5>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>EMAIL</th>
                  <th>APELLIDO</th>
                  <th>NOMBRE</th>
                  <th>NRO. CONTACTO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody className="table-group-divider table-divider-color">
                {filteredDonantes.map((donante) => (
                  <tr key={donante.mail}>
                    <td>{donante.mail}</td>
                    <td>{donante.apellido}</td>
                    <td>{donante.nombre}</td>
                    <td>{donante.telefono}</td>
                    <td>
                      <EditButton
                        onClick={() =>
                          window.alert("Funcionalidad en desarrollo.")
                        }
                      />
                      <DeleteButton
                        onClick={() =>
                          window.alert("Funcionalidad en desarrollo.")
                        }
                      />
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

export default DonanteTable;
