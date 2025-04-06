import { useEffect, useState } from "react";
import PelucaInventory from "../components/PelucaInventory";
import {
  deletePeluca,
  fetchPelucasWithDisponibilidad,
  fetchResumenPelucas,
} from "../services/pelucaService";
import {
  MySwal,
  showErrorAlert,
  showLoadingAlert,
  showSuccessAlert,
} from "../utils/sweetAlertGeneralize";
import Loading from "../components/loading/Loading";

const PelucaList = () => {
  const [pelucas, setPelucas] = useState([]);
  const [resumenPelucas, setResumenPelucas] = useState(null);

  useEffect(() => {
    loadPelucas();
    loadResumenPelucas();
  }, []);

  /*
  const loadPelucas = async () => {
    try {
      const dataPelucas = await fetchPelucas();
      setPelucas(dataPelucas);
    } catch (error) {
      console.log("Error, no se pudo obtener las pelucas: ", error);
    }
  };
  */
  const loadPelucas = async () => {
    try {
      const dataPelucas = await fetchPelucasWithDisponibilidad();
      setPelucas(dataPelucas);
    } catch (error) {
      console.log("Error, no se pudo obtener las pelucas: ", error);
    }
  };

  const loadResumenPelucas = async () => {
    try {
      const resumen = await fetchResumenPelucas();
      setResumenPelucas(resumen.data);
    } catch (error) {
      console.log("Error, no se pudo obtener el resumen de pelucas: ", error);
    }
  };

  /**
   * Manejador para eliminar una peluca
   * @param {*} codigo - Pasar el código de la peluca ha eliminar
   */
  const handleDeletePeluca = async (codigo) => {
    try {
      showLoadingAlert("Eliminando...");
      const peluca = await deletePeluca(codigo);
      MySwal.close();
      console.log("Peluca eliminada con éxito: ", peluca);
      showSuccessAlert("La Peluca ha sido eliminada exitosamente.");
      loadResumenPelucas();
      loadPelucas();
    } catch (error) {
      MySwal.close();
      console.log("Error, no se pudo eliminar la peluca: ", error);
      showErrorAlert("Error al intentar eliminar la Peluca.");
    }
  };

  if (!pelucas || !resumenPelucas) {
    return <Loading></Loading>;
  }

  return (
    <>
      <PelucaInventory
        pelucas={pelucas}
        resumenPeluca={resumenPelucas}
        onDelete={handleDeletePeluca}
      ></PelucaInventory>
    </>
  );
};

export default PelucaList;
