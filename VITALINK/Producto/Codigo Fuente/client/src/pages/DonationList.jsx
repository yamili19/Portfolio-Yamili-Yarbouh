/**
 * Archivo jsx que representa la ruta /donaciones (realiza la llamada a la tabla de components)
 */

import { useEffect, useState } from "react";
import DonationTable from "../components/DonationTable";
import { deleteDonacion, fetchDonaciones } from "../services/donacionService";
import {
  MySwal,
  showErrorAlert,
  showLoadingAlert,
  showSuccessAlert,
} from "../utils/sweetAlertGeneralize";
import FilterTableDonaciones from "../components/filters/FilterTableDonaciones";

const DonationList = () => {
  const [donaciones, setDonaciones] = useState([]);
  const [filteredDonaciones, setFilteredDonaciones] = useState([]);

  useEffect(() => {
    loadDonaciones();
  }, []);

  useEffect(() => {
    setFilteredDonaciones(donaciones); // Inicialmente, muestra todas las donaciones
  }, [donaciones]);

  const loadDonaciones = async () => {
    try {
      const donacionesRealizadas = await fetchDonaciones();
      setDonaciones(donacionesRealizadas);
    } catch (error) {
      console.log("Error, no se pudo obtener las donaciones: ", error);
    }
  };


  const handleDeleteDonacion = async (fecha) => {
    try {
      showLoadingAlert("Eliminando...");
      const donacion = await deleteDonacion(fecha);
      MySwal.close();
      console.log("Donación eliminada con éxito: ", donacion);
      showSuccessAlert("La Donación ha sido eliminada exitosamente");
      loadDonaciones();
    } catch (error) {
      MySwal.close();
      console.log("Error, no se pudo eliminar la donación: ", error);
      showErrorAlert("Error al intentar eliminar la Donación");
    }
  };

  const handleFilter = (filters) => {
    let filtered = donaciones;

    if (filters.fecha) {
      // Convertir la fecha del filtro a formato YYYY-MM-DD
      const filterDate = new Date(filters.fecha);
      const filterDateStr = filterDate.toISOString().split('T')[0];
      
      filtered = filtered.filter(donacion => {
        // Convertir la fecha de la donación a objeto Date si no lo es
        const donationDate = new Date(donacion.fecha);
        // Formatear a YYYY-MM-DD para comparación
        const donationDateStr = donationDate.toISOString().split('T')[0];
        return donationDateStr === filterDateStr;
      });
    }

    if (filters.emailDonante) {
      filtered = filtered.filter((donacion) =>
        donacion.mail.toLowerCase().includes(filters.emailDonante.toLowerCase())
      );
    }

    if (filters.peluqueria) {
      filtered = filtered.filter((donacion) => {
        const entidad = donacion.entidad ? donacion.entidad.toLowerCase() : "";
        //console.log('donacion.entidad:', entidad);
        return entidad.includes(filters.peluqueria.toLowerCase());
      });
    }

    if (filters.donante) {
      const donanteFiltro = filters.donante.toLowerCase();
      filtered = filtered.filter((donacion) => {
        const { apellido = "", nombre = "" } = donacion.donante;
        const fullName = `${apellido} ${nombre}`.toLowerCase();
        const reversedFullName = `${nombre} ${apellido}`.toLowerCase();
        return (
          fullName.includes(donanteFiltro) ||
          reversedFullName.includes(donanteFiltro)
        );
      });
    }
    setFilteredDonaciones(filtered);
  };

  return (
    <>
      <FilterTableDonaciones onFilter={handleFilter}></FilterTableDonaciones>
      <DonationTable
        donaciones={filteredDonaciones}
        onDelete={handleDeleteDonacion}
      ></DonationTable>
    </>
  );
};

export default DonationList;
