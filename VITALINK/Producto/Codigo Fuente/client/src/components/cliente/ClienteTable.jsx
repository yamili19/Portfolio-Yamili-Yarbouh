import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Paginacion from "../paginacion/Paginacion";
import Loading from "../loading/Loading";
import FilterTableClientes from "../../components/filters/FilterTableClientes"; // Importamos el componente de filtros
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const ClienteTable = () => {
  const [clientes, setClientes] = useState([]);
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();
  const urlClientes = "http://localhost:8000/api/clientes/";

  const fetchClientes = async () => {
    try {
      const res = await axios.get(urlClientes);
      setClientes(res.data);
      setFilteredClientes(res.data);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const applyFilters = (filters) => {
    let filtered = clientes;

    if (filters.nombre) {
      filtered = filtered.filter((cliente) =>
        cliente.nombre.toLowerCase().includes(filters.nombre.toLowerCase())
      );
    }
    if (filters.apellido) {
      filtered = filtered.filter((cliente) =>
        cliente.apellido.toLowerCase().includes(filters.apellido.toLowerCase())
      );
    }
    if (filters.dni) {
      filtered = filtered.filter((cliente) =>
        String(cliente.dni).includes(filters.dni)
      );
    }
    if (filters.nroTelefono) {
      filtered = filtered.filter((cliente) =>
        String(cliente.nroTelefono).includes(filters.nroTelefono)
      );
    }
    if (filters.ciudad) {
      filtered = filtered.filter((cliente) =>
        cliente.ciudadClienteData.nombre
          .toLowerCase()
          .includes(filters.ciudad.toLowerCase())
      );
    }

    setFilteredClientes(filtered);
  };

  const indexOfLastCliente = currentPage * itemsPerPage;
  const indexOfFirstCliente = indexOfLastCliente - itemsPerPage;
  const currentClientes = filteredClientes.slice(
    indexOfFirstCliente,
    indexOfLastCliente
  );

  if (!clientes) {
    return <Loading />;
  }

  return (
    <>
      {/* Aquí usamos el componente FilterTableClientes */}
      <FilterTableClientes onFilter={applyFilters} />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mt-4">
          <button
            className="btn btn-success"
            style={{
              borderRadius: "20px",
              marginBottom: "20px",
              marginRight: "10px",
              width: "200px",
            }}
            onClick={() => navigate("/registrarPrestamo")}
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
            onClick={() => navigate("/prestamos")}
          >
            Prestamos
          </button>
        </div>

        <div className="card">
          <div className="card-header">
            <h5>Lista de Mis Clientes</h5>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>DNI</th>
                  <th>APELLIDO</th>
                  <th>NOMBRE</th>
                  <th>NRO. CONTACTO</th>
                  <th>CIUDAD</th>
                  <th>EN ESPERA</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {currentClientes.map((cliente) => (
                  <tr key={cliente.dni}>
                    <td>{cliente.dni}</td>
                    <td>{cliente.apellido}</td>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.nroTelefono}</td>
                    <td>{cliente.ciudadClienteData.nombre}</td>
                    <td>
                      {cliente.estaEnListaDeEspera ? (
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

        <div className="d-flex justify-content-center mt-4">
          <Paginacion
            totalItems={filteredClientes.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default ClienteTable;
