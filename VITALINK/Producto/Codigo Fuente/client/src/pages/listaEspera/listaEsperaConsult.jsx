import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import ListaEsperaTable from "../../components/ListaEsperaTable"; 
import { fetchListaEspera, deleteListaEspera } from "../../services/listaEsperaService"; 
import {
  MySwal,
  showErrorAlert,
  showLoadingAlert,
  showSuccessAlert,
} from "../../utils/sweetAlertGeneralize";
import FilterTableListaEspera from "../../components/filters/FilterTableListaEspera";

const ListaEsperaPage = () => {
  const [listaEspera, setListaEspera] = useState([]);
  const [filteredListaEspera, setFilteredListaEspera] = useState([]);
  const navigate = useNavigate(); // Hook para navegar

  useEffect(() => {
    loadListaEspera();
  }, []);

  useEffect(() => {
    setFilteredListaEspera(listaEspera); 
  }, [listaEspera]);

  const loadListaEspera = async () => {
    try {
      const listaObtenida = await fetchListaEspera();
      setListaEspera(listaObtenida);
    } catch (error) {
      console.log("Error, no se pudo obtener la lista de espera: ", error);
    }
  };

  const handleDeleteListaEspera = async (nroOrden) => {
    const result = await MySwal.fire({
      title: "¿Estás seguro?",
      text: "No podrás deshacer esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) {
      try {
        showLoadingAlert("Eliminando...");
        await deleteListaEspera(nroOrden); 
        MySwal.close();
        showSuccessAlert("La entrada ha sido eliminada exitosamente");
        loadListaEspera(); 
      } catch (error) {
        MySwal.close();
        console.log("Error, no se pudo eliminar la entrada: ", error);
        showErrorAlert("Error al intentar eliminar la entrada de la lista de espera");
      }
    }
  };

  const handleFilter = (filters) => {
    let filtered = listaEspera;

    if (filters.fechaSolicitud) {
      filtered = filtered.filter(
        (item) =>
          new Date(item.fechaSolicitud).toISOString().split("T")[0] ===
          new Date(filters.fechaSolicitud).toISOString().split("T")[0]
      );
    }

    if (filters.dni) {
      filtered = filtered.filter(
        (item) =>
          item.clienteData.dni.toString().includes(filters.dni) 
      );
    }

    if (filters.nombre) {
      filtered = filtered.filter((item) =>
        item.clienteData.nombre.toLowerCase().includes(filters.nombre.toLowerCase())
      );
    }

    if (filters.apellido) {
      filtered = filtered.filter((item) =>
        item.clienteData.apellido.toLowerCase().includes(filters.apellido.toLowerCase())
      );
    }

    setFilteredListaEspera(filtered);
  };

  return (
    <>
      <FilterTableListaEspera onFilter={handleFilter}></FilterTableListaEspera>
      
      <div className="d-flex justify-content-end">
        <ListaEsperaTable
          listaEspera={filteredListaEspera}
          onDelete={handleDeleteListaEspera}
        />
      </div>
    </>
  );
};

export default ListaEsperaPage;
