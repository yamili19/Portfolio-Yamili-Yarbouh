import { useEffect, useState } from "react";
import {
  fetchObraSociales,
  deleteObraSocial,
} from "../services/obraSocialService";
import ObraSocialTable from "../components/ObraSocialTable";
import {
  MySwal,
  showLoadingAlert,
  showSuccessAlert,
  showErrorAlert,
} from "../utils/sweetAlertGeneralize";
import Loading from "../components/loading/Loading";

const ObraSocialList = () => {
  const [obrasSociales, setObrasSociales] = useState([]);

  useEffect(() => {
    loadObrasSociales();
  }, []);

  //Se consume el serivicio para traer todas las obras sociales registradas
  const loadObrasSociales = async () => {
    try {
      const obrasSocialesData = await fetchObraSociales();
      setObrasSociales(obrasSocialesData);
    } catch (error) {
      console.log("Error en el fetching de obras sociales: ", error);
    }
  };

  /**
   * Pasar el id de la obra social a eliminar
   * @param {*} id
   */
  const handleDeleteObraSocial = async (id) => {
    try {
      showLoadingAlert("Eliminando...");
      const obraSocial = await deleteObraSocial(id);
      console.log("Obra Social eliminada correctamente: ", obraSocial);
      MySwal.close();
      showSuccessAlert("La Obra Social ha sido eliminada exitosamente");
      loadObrasSociales();
    } catch (error) {
      MySwal.close();
      console.log("Error, no se pudo eliminar la obra social: ", error);
      showErrorAlert("Error al intentar eliminar la Obra Social");
    }
  };

  if (!obrasSociales) {
    return <Loading></Loading>;
  }

  return (
    <>
      <ObraSocialTable
        obras={obrasSociales}
        onDelete={handleDeleteObraSocial}
      ></ObraSocialTable>
    </>
  );
};

export default ObraSocialList;
