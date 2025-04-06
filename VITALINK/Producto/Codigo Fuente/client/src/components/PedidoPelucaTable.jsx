/* eslint-disable react/prop-types */
import EditButton from "./buttons/EditButton";
import DeleteButton from "./buttons/DeleteButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { showConfirmationAlert } from "../utils/sweetAlertGeneralize";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import Loading from "./loading/Loading";
import { useState } from "react";
import Paginacion from "./paginacion/Paginacion";
import FilterTablePedidos from "./filters/FilterTablePedidos";

const PedidoPelucaTable = ({ pedidos, onDelete }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pedidosPerPage = 10; // Número de pedidos por página

  // Estado para almacenar los filtros
  const [filters, setFilters] = useState({
    fechaInicio: "",
    fechaFin: "",
    pedidoObtenido: "",
  });

  // Filtrar pedidos en función de los filtros seleccionados
  const filteredPedidos = pedidos.filter((pedido) => {
    const fechaPedido = new Date(pedido.fechaPedido);
    const fechaInicio = new Date(filters.fechaInicio);
    const fechaFin = new Date(filters.fechaFin);
    const pedidoObtenido = filters.pedidoObtenido === "si" ? true : false;

    const fechaValida =
      (filters.fechaInicio ? fechaPedido >= fechaInicio : true) &&
      (filters.fechaFin ? fechaPedido <= fechaFin : true);

    const estadoValido =
      filters.pedidoObtenido === ""
        ? true
        : filters.pedidoObtenido === "Obtenido"
        ? pedido.cantPelucasLlegaron !== null
        : pedido.cantPelucasLlegaron === null;

    return fechaValida && estadoValido;
  });

  // Calcular el rango de pedidos a mostrar en la página actual
  const indexOfLastPedido = currentPage * pedidosPerPage;
  const indexOfFirstPedido = indexOfLastPedido - pedidosPerPage;
  const currentPedidos = filteredPedidos.slice(
    indexOfFirstPedido,
    indexOfLastPedido
  );

  /**
   * Función para confirmar la eliminación de un pedido
   * @param {*} fechaPedido - Pasar la fecha del pedido
   */
  const confirmDelete = (fechaPedido) => {
    showConfirmationAlert("¿Desea eliminar este Pedido?", () => {
      onDelete(fechaPedido);
    });
  };

  /**
   * Navega al formulario para editar el pedido
   * @param {*} fechaPedido - Pasar la fecha del pedido a editar
   */
  const navigateToEdit = (fechaPedido) => {
    const urlPedidoPelucaEdit = "/pedidos/editar/";
    navigate(urlPedidoPelucaEdit + fechaPedido);
  };

  const navigateToRegisterPedido = () => {
    const urlRegisterPedido = "/registrarPedido/";
    navigate(urlRegisterPedido);
  };

  if (!pedidos) {
    return <Loading></Loading>;
  }

  const handleFilterChange = (filters) => {
    setFilters(filters);
    setCurrentPage(1); // Reiniciar a la primera página cuando se aplica un filtro
  };

  return (
    <>
      {/* Componente de filtros */}
      <FilterTablePedidos onFilter={handleFilterChange} />
      <div className="container mt-4">
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
            onClick={() => navigateToRegisterPedido()}
          >
            Nuevo Pedido
          </button>
        </div>
        <div className="card mb-2">
          <div className="card-header">
            <h5>Lista de Pedidos de Pelucas realizados</h5>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>FECHA</th>
                  <th>CANTIDAD CABELLO (KG)</th>
                  <th>PELUCAS ESTIMADAS</th>
                  <th>PELUCAS OBTENIDAS</th>
                  <th>OBTENIDO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody className="table-group-divider table-divider-color">
                {currentPedidos.map((pedido) => (
                  <tr key={pedido.fechaPedido}>
                    <td>{formatDate(pedido.fechaPedido)}</td>
                    <td>{pedido.cantCabello}</td>
                    <td>{pedido.cantPelucasEstimadas}</td>
                    <td>{pedido.cantPelucasLlegaron ?? 0}</td>
                    <td>
                      {pedido.cantPelucasLlegaron ? (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-success"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faTimes}
                          className="text-danger"
                        />
                      )}
                    </td>
                    <td>
                      <div className="d-flex">
                        <EditButton
                          onClick={() => navigateToEdit(pedido.fechaPedido)}
                        />
                        <DeleteButton
                          onClick={() => confirmDelete(pedido.fechaPedido)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <Paginacion
            currentPage={currentPage}
            totalItems={filteredPedidos.length}
            itemsPerPage={pedidosPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
};

export default PedidoPelucaTable;
