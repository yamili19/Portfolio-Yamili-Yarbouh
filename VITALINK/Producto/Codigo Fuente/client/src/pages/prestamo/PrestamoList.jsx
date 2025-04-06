import { useEffect, useState } from "react";
import PrestamoTable from "../../components/prestamo/PrestamoTable";
import {
  MySwal,
  showErrorAlert,
  showLoadingAlert,
  showSuccessAlert,
} from "../../utils/sweetAlertGeneralize";
import {
  deletePrestamo,
  fetchPrestamo,
  fetchResumenPrestamo,
} from "../../services/prestamoService";
import FilterTablePrestamos from "../../components/filters/FilterTablePrestamos";

const PrestamoList = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [resumenPrestamo, setResumenPrestamo] = useState(null);
  const [filteredPrestamos, setFilteredPrestamos] = useState([]);

  useEffect(() => {
    loadPrestamos();
    loadResumenPrestamo();
  }, []);

  /*
  useEffect(() => {
    loadResumenPrestamo();
  }, [resumenPrestamo]);
  */

  const loadPrestamos = async () => {
    try {
      //showLoadingAlert("Cargando Préstamos...");
      const prestamosRealizados = await fetchPrestamo();
      setPrestamos(prestamosRealizados);
      setFilteredPrestamos(prestamosRealizados);
      //MySwal.close();
    } catch (error) {
      //MySwal.close();
      console.log("Error no se pudo obtener los préstamos: ", error);
      //showErrorAlert("Error al intentar obtener el listado de Préstamos.");
    }
  };

  const loadResumenPrestamo = async () => {
    try {
      const resumen = await fetchResumenPrestamo();
      console.log("data resumen: ", resumen);
      setResumenPrestamo(resumen.data);
      console.log("Datos del resumen: ", resumenPrestamo);
    } catch (error) {
      console.log("Error, no se pudo obtener el resumen de préstamos: ", error);
    }
  };

  const handleDeletePrestamo = async (nroPrestamo) => {
    try {
      showLoadingAlert("Eliminando Préstamo...");
      const prestamo = await deletePrestamo(nroPrestamo);
      MySwal.close();
      console.log("Prestamo eliminado correctamente: ", prestamo);
      showSuccessAlert(
        `El Préstamo ${nroPrestamo} ha sido eliminado existosamente.`
      );
      loadResumenPrestamo();
      loadPrestamos();
    } catch (error) {
      MySwal.close();
      console.log("Error, no se pudo eliminar el préstamo: ", error);
      showErrorAlert("Error al intentar eliminar el Préstamo.");
    }
  };

  const handleFilter = (filters) => {
    let filtered = prestamos;

    if (filters.nroPrestamo) {
      filtered = filtered.filter((prestamo) =>
        prestamo.nroPrestamo.toString().includes(filters.nroPrestamo)
      );
    }

    if (filters.cliente) {
      const clienteFilter = filters.cliente.toLowerCase();
      filtered = filtered.filter((prestamo) => {
        const fullName =
          `${prestamo.cliente.apellido} ${prestamo.cliente.nombre}`.toLowerCase();
        return fullName.includes(clienteFilter);
      });
    }

    if (filters.codPeluca) {
      filtered = filtered.filter((prestamo) =>
        prestamo.Peluca.codigo.toString().includes(filters.codPeluca)
      );
    }

    if (filters.estado) {
      filtered = filtered.filter(
        (prestamo) => prestamo.EstadoPrestamo.nombre === filters.estado
      );
    }

    // Nuevos filtros añadidos
    if (filters.dni) {
      filtered = filtered.filter((prestamo) =>
        prestamo.cliente.dni.toString().includes(filters.dni)
      );
    }

    if (filters.fechaPrestamo) {
      filtered = filtered.filter(
        (prestamo) => prestamo.fechaPrestamo === filters.fechaPrestamo
      );
    }

    if (filters.fechaDevolucion) {
      filtered = filtered.filter(
        (prestamo) => prestamo.fechaDevolucion === filters.fechaDevolucion
      );
    }

    if (filters.vinculo) {
      filtered = filtered.filter(
        (prestamo) => prestamo.Vinculo.nombre === filters.vinculo
      );
    }

    setFilteredPrestamos(filtered);
  };

  return (
    <>
      <FilterTablePrestamos onFilter={handleFilter}></FilterTablePrestamos>
      <PrestamoTable
        prestamos={filteredPrestamos}
        resumenPrestamo={resumenPrestamo}
        onDelete={handleDeletePrestamo}
      ></PrestamoTable>
    </>
  );
};

export default PrestamoList;
