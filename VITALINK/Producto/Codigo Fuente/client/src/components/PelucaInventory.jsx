/* eslint-disable react/prop-types */

/**
 * Archivo que se utiliza para definiri la estructura del inventario de pelucas
 */

import useLoadMDBScript from "../hooks/useLoadMDBScript";
import ConsultButton from "./buttons/ConsultButton";
import DeleteButton from "./buttons/DeleteButton";
import EditButton from "./buttons/EditButton";
import imgNullPeluca from "../assets/images/img-null-peluca-removebg.png";
import { showConfirmationAlert } from "../utils/sweetAlertGeneralize";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import FilterTablePelucas from "./filters/FilterTablePelucas";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import Paginacion from "./paginacion/Paginacion";

const PelucaInventory = ({ pelucas, resumenPeluca, onDelete }) => {
  useLoadMDBScript();
  const navigate = useNavigate();
  const [hoveredPeluca, setHoveredPeluca] = useState(null);
  //const urlBaseImagenPeluca = "../../../server";
  // Función para determinar el color del estado
  const [filteredPelucas, setFilteredPelucas] = useState(pelucas);
  const [filters, setFilters] = useState({
    codigo: "",
    talle: "",
    estado: "",
    tipoPelo: "",
    colorPelo: "",
  });

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Máximo de 9 pelucas por página

  // Función para calcular las pelucas a mostrar en la página actual
  const indexOfLastPeluca = currentPage * itemsPerPage;
  const indexOfFirstPeluca = indexOfLastPeluca - itemsPerPage;
  const currentPelucas = filteredPelucas.slice(
    indexOfFirstPeluca,
    indexOfLastPeluca
  );

  const getEstadoColor = (estadoPeluca) => {
    switch (estadoPeluca) {
      case 1:
        return "bg-success text-white"; // Verde para "Nueva"
      case 2:
        return "bg-warning text-dark"; // Amarillo para "Usada"
      case 3:
        return "bg-danger text-white"; // Rojo para "Roto"
      default:
        return "bg-secondary text-white"; // Color gris para otros estados
    }
  };

  /**
   * Función para confirmar la eliminación de una peluca
   * @param {*} codigo - Pasar el código de la peluca a eliminar
   */
  const confirmDelete = (codigo) => {
    showConfirmationAlert("¿Desea eliminar está peluca?", () => {
      onDelete(codigo);
    });
  };

  /**
   * Función para dirigirse al JSX de consultar una peluca
   * @param {*} codigo - Pasar el codigo de la peluca a consultar
   */
  const navigateToConsultPeluca = (codigo) => {
    const urlConsultPeluca = "/pelucas/consultar/";
    navigate(urlConsultPeluca + codigo);
  };

  const navigateToRegisterPeluca = () => {
    const urlRegisterPeluca = "/registrarPeluca/";
    navigate(urlRegisterPeluca);
  };

  const applyFilters = () => {
    let filtered = pelucas;

    if (filters.codigo) {
      filtered = filtered.filter((peluca) =>
        peluca.codigo.toString().includes(filters.codigo)
      );
    }
    if (filters.talle) {
      filtered = filtered.filter((peluca) => peluca.talle === filters.talle);
    }
    if (filters.estado) {
      filtered = filtered.filter(
        (peluca) => peluca.estado.nombre === filters.estado
      );
    }
    if (filters.tipoPelo) {
      filtered = filtered.filter(
        (peluca) => peluca.tipoDePelo.descripcion === filters.tipoPelo
      );
    }
    if (filters.colorPelo) {
      filtered = filtered.filter((peluca) =>
        peluca.color.toLowerCase().includes(filters.colorPelo.toLowerCase())
      );
    }

    setFilteredPelucas(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, pelucas]);

  return (
    <>
      <FilterTablePelucas
        filters={filters}
        setFilters={setFilters}
      ></FilterTablePelucas>
      <div className="container inventory-container">
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="flex-grow-1"></div>{" "}
          {/* Espaciador para empujar el botón a la derecha */}
          <button
            className="btn btn-success"
            style={{
              borderRadius: "20px",
              marginBottom: "20px",
            }}
            onClick={() => navigateToRegisterPeluca()}
          >
            Añadir Peluca
          </button>
        </div>
        <div className="card inventory-card">
          <div className="card-header inventory-card-header">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-4 text-center">Inventario de Pelucas</h5>
              {resumenPeluca && (
                <div className="d-flex align-items-center">
                  <span
                    className="badge rounded-pill bg-secondary text-white me-2"
                    style={{ fontSize: "0.85rem" }}
                  >
                    Stock Pelucas: {resumenPeluca.totalPelucas}
                  </span>
                  <span
                    className="badge rounded-pill bg-success text-white me-2"
                    style={{ fontSize: "0.85rem" }}
                  >
                    Nuevas: {resumenPeluca.nuevas}
                  </span>
                  <span
                    className="badge rounded-pill bg-warning text-dark me-2"
                    style={{ fontSize: "0.85rem" }}
                  >
                    Usadas: {resumenPeluca.usadas}
                  </span>
                  <span
                    className="badge rounded-pill bg-danger text-white me-2"
                    style={{ fontSize: "0.85rem" }}
                  >
                    Rotas: {resumenPeluca.rotas}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="card-body inventory-card-body">
            <div className="row">
              {currentPelucas.map((peluca) => (
                <div className="col-lg-4 col-md-6 mb-4" key={peluca.codigo}>
                  <div className="card h-100">
                    <div
                      className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        src={
                          peluca.foto
                            ? `http://localhost:8000/${peluca.foto.replace(
                                /\\/g,
                                "/"
                              )}`
                            : imgNullPeluca
                        }
                        className="w-100"
                        style={{ height: "300px", objectFit: "cover" }}
                        alt={`Peluca ${peluca.codigo}`}
                      />
                      {!peluca.estaDisponible && (
                        <div
                          className="position-absolute top-0 end-0 p-2"
                          style={{ fontSize: "2rem", color: "red" }}
                        >
                          <FontAwesomeIcon
                            icon={faBan}
                            size="4x"
                            className="text-danger"
                            title="Peluca no disponible"
                          />
                        </div>
                      )}
                      <a href="#!">
                        <div className="mask">
                          <div className="d-flex justify-content-start align-items-end h-100">
                            <h5>
                              <span
                                className={`badge ${getEstadoColor(
                                  peluca.estadoPeluca
                                )} ms-2`}
                              >
                                {peluca.estado.nombre}
                              </span>
                            </h5>
                          </div>
                        </div>
                        <div className="hover-overlay">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </div>
                      </a>
                    </div>
                    {/* Borde fucsia entre la imagen y el texto */}
                    <div
                      style={{
                        borderBottom: "2px solid fuchsia",
                        width: "100%",
                      }}
                    ></div>
                    <div
                      className="card-body text-center inventory-card-content"
                      style={{
                        backgroundColor:
                          hoveredPeluca === peluca.codigo
                            ? "#ffc0cb"
                            : "#ffe3e3",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseEnter={() => setHoveredPeluca(peluca.codigo)}
                      onMouseLeave={() => setHoveredPeluca(null)}
                    >
                      <h5 className="card-title">Código: {peluca.codigo}</h5>
                      <p className="card-text">
                        Talle: {peluca.talle}
                        <br />
                        Fecha de Confección:{" "}
                        {formatDate(peluca.fechaConfeccion)}
                        <br />
                        Tipo de Pelo: {peluca.tipoDePelo.descripcion}
                      </p>
                    </div>
                    {/* Borde fucsia entre el texto y los botones */}
                    <div
                      style={{
                        borderBottom: "2px solid fuchsia",
                        width: "100%",
                      }}
                    ></div>
                    <div
                      className="card-footer d-flex justify-content-center align-items-center inventory-card-footer"
                      style={{ backgroundColor: "#ffe3e3" }}
                    >
                      <div>
                        <ConsultButton
                          onClick={() => navigateToConsultPeluca(peluca.codigo)}
                        />
                        <EditButton />
                        <DeleteButton
                          onClick={() => confirmDelete(peluca.codigo)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Componente de Paginación centrado debajo de la lista de pelucas */}
        <div className="d-flex justify-content-center mt-4">
          <Paginacion
            totalItems={filteredPelucas.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default PelucaInventory;
