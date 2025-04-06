/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import "../css/listTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FilterTablePeluqueria from "../components/filters/FilterTablePeluqueria";
import {
  MySwal,
  showConfirmationAlert,
  showLoadingAlert,
  showSuccessAlert,
  showErrorAlert,
} from "../utils/sweetAlertGeneralize";
import Loading from "../components/loading/Loading";
import Paginacion from "../components/paginacion/Paginacion";

const urlBase = "http://localhost:8000/api/peluquerias/";

const Table = () => {
  const [peluquerias, setPeluquerias] = useState([]);
  const [filteredPeluquerias, setFilteredPeluquerias] = useState([]);
  const [filters, setFilters] = useState({
    nombre: "",
    contacto: "",
    nroCelular: "",
    nroTelefono: "",
    barrio: "",
  });

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 10; // Máximo 10 por página

  const indexOfLastPeluquerias = currentPage * itemsPerPage;
  const indexOfFirstPeluquerias = indexOfLastPeluquerias - itemsPerPage;
  const currentPeluquerias = filteredPeluquerias.slice(
    indexOfFirstPeluquerias,
    indexOfLastPeluquerias
  );

  const navigate = useNavigate();

  useEffect(() => {
    fetchPeluquerias();
  }, []);

  useEffect(() => {
    applyFilters(filters);
  }, [filters, peluquerias]);

  const fetchPeluquerias = async () => {
    try {
      const res = await axios.get(urlBase);
      setPeluquerias(res.data);
      setFilteredPeluquerias(res.data); // Set filtered data initially
    } catch (error) {
      console.log("Error al obtener las peluquerías: ", error);
    }
  };

  const deletePeluqueria = async (nombre) => {
    try {
      showLoadingAlert("Eliminando...");
      await axios.delete(urlBase + nombre);
      MySwal.close();
      showSuccessAlert("La Peluquería ha sido eliminada exitosamente.");
      fetchPeluquerias();
    } catch (error) {
      MySwal.close();
      console.log("Error al eliminar peluquería: ", error);
      showErrorAlert("Error al eliminar la peluquería");
    }
  };

  const confirmDelete = (nombre) => {
    showConfirmationAlert("¿Desea eliminar esta peluquería?", () => {
      deletePeluqueria(nombre);
    });
  };

  const navigateToConsult = (nombre) => {
    const urlConsultPeluqueria = "/peluquerias/consultar/";
    navigate(urlConsultPeluqueria + nombre);
  };

  const navigateToEdit = (nombre) => {
    const urlEditPeluqueria = "/peluquerias/editar/";
    navigate(urlEditPeluqueria + nombre);
  };

  const navigateToRegisterPeluqueria = () => {
    const urlRegisterPeluqueria = "/registrarPeluqueria/";
    navigate(urlRegisterPeluqueria);
  };

  // Cambiar para enviar TODAS las peluquerías registradas
  const navigateToMap = () => {
    console.log("Peluquerías que se enviarán al mapa:", peluquerias);  // Agregar este log
    navigate("/peluquerias/mapa", { state: { peluquerias } });
  };
  

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    let filtered = peluquerias;

    if (newFilters.nombre) {
      filtered = filtered.filter((p) =>
        p.nombre.toLowerCase().includes(newFilters.nombre.toLowerCase())
      );
    }

    if (newFilters.contacto) {
      filtered = filtered.filter((p) =>
        p.contacto.toLowerCase().includes(newFilters.contacto.toLowerCase())
      );
    }

    if (newFilters.nroCelular) {
      filtered = filtered.filter((p) =>
        p.nroCelular.toString().includes(newFilters.nroCelular)
      );
    }

    if (newFilters.nroTelefono) {
      filtered = filtered.filter((p) =>
        p.nroFijo.toString().includes(newFilters.nroTelefono)
      );
    }

    if (newFilters.barrio) {
      filtered = filtered.filter(
        (p) => p.Barrio && p.Barrio.nombre === newFilters.barrio
      );
    }

    setFilteredPeluquerias(filtered);
  };

  if (!peluquerias) {
    return <Loading />;
  }

  return (
    <>
      <FilterTablePeluqueria onFilter={applyFilters}></FilterTablePeluqueria>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="flex-grow-1"></div>{" "}
          {/* Espaciador para empujar los botones a la derecha */}
          <div>
            <button
              className="btn btn-success"
              style={{
                borderRadius: "20px",
                marginRight: "10px",
                marginBottom: "20px",
              }}
              onClick={() => navigateToRegisterPeluqueria()}
            >
              Añadir Peluquería
            </button>
            <button
              className="btn btn-primary"
              style={{
                borderRadius: "20px",
                marginBottom: "20px",
              }}
              onClick={navigateToMap}
            >
              Ver Mapa
            </button>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h5>Peluquerías Asociadas</h5>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>NOMBRE</th>
                  <th>CONTACTO</th>
                  <th>CELULAR</th>
                  <th>TELÉFONO</th>
                  <th>BARRIO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody className="table-group-divider table-divider-color">
                {currentPeluquerias.length > 0 ? (
                  currentPeluquerias.map((p) => (
                    <tr key={p.nombre}>
                      <td>{p.nombre}</td>
                      <td>{p.contacto}</td>
                      <td>{p.nroCelular}</td>
                      <td>{p.nroFijo}</td>
                      <td>{p.Barrio ? p.Barrio.nombre : "-"}</td>
                      <td>
                        <button
                          className="btn btn-info btn-sm btn-consultar"
                          title="Consultar"
                          onClick={() => navigateToConsult(p.nombre)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>

                        <button
                          className="btn btn-warning btn-sm btn-modificar"
                          title="Modificar"
                          onClick={() => navigateToEdit(p.nombre)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>

                        <button
                          className="btn btn-danger btn-sm btn-eliminar"
                          title="Eliminar"
                          onClick={() => confirmDelete(p.nombre)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No se encontraron peluquerías.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <Paginacion
            totalItems={filteredPeluquerias.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default Table;
