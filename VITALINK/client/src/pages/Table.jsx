import { useEffect, useState } from "react";
import "../css/listTable.css";
import FilterTable from "../components/FilterTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {
  showDeleteConfirmationAlert,
  showDeleteSuccessAlert,
  showErrorAlert,
} from "../utils/sweetAlert";
import { useNavigate } from "react-router-dom";

const urlBase = "http://localhost:8000/api/peluquerias/";

const Table = () => {
  /**
   * Se hace uso de Axios para obtener las peluquerias desde el back
   */

  const [peluqueria, setPeluqueria] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPeluqueria();
  }, []);

  const fetchPeluqueria = async () => {
    try {
      const res = await axios.get(urlBase);
      setPeluqueria(res.data);
      console.log("Peluquerias desde el back: ", res.data);
    } catch (error) {
      console.log("Error al obtener las peluquerías: ", error);
    }
  };

  const deletePeluqueria = async (nombre) => {
    try {
      await axios.delete(urlBase + nombre);
      fetchPeluqueria();
      showDeleteSuccessAlert();
    } catch (error) {
      console.log("Error al eliminar peluqueria: ", error);
      showErrorAlert("Error al eliminar la peluquería");
    }
  };

  const confirmDelete = (nombre) => {
    showDeleteConfirmationAlert(() => deletePeluqueria(nombre));
  };

  const navigateToConsult = (nombre) => {
    const urlConsultPeluqueria = "/peluquerias/consultar/";
    navigate(urlConsultPeluqueria + nombre);
  };

  const navigateToEdit = (nombre) => {
    const urlEditPeluqueria = "/peluquerias/editar/";
    navigate(urlEditPeluqueria + nombre);
  };

  return (
    <>
      <FilterTable></FilterTable>
      <div className="container mt-4">
        <div className="card">
          <div className="card-header">
            <h5>Lista de Peluquerías</h5>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  {/*<th>ID</th>*/}
                  <th>NOMBRE</th>
                  <th>CONTACTO</th>
                  <th>CELULAR</th>
                  <th>TELÉFONO</th>
                  <th>BARRIO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody className="table-group-divider table-divider-color">
                {peluqueria.map((p) => (
                  <tr key={p.nombre}>
                    {/*<td>{peluqueria.id}</td>*/}
                    <td>{p.nombre}</td>
                    <td>{p.contacto}</td>
                    <td>{p.nroCelular}</td>
                    <td>{p.nroFijo}</td>
                    <td>{p.Barrio.nombre}</td>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
