import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchObraSocialById,
  updateObraSocial,
} from "../services/obraSocialService";
import {
  MySwal,
  showErrorAlert,
  showLoadingAlert,
  showSuccessAlert,
} from "../utils/sweetAlertGeneralize";
import ObraSocialForm from "../components/ObraSocialForm";
import useLoadMDBScript from "../hooks/useLoadMDBScript";
import Loading from "../components/loading/Loading";

const ObraSocialEdit = () => {
  const [obraSocial, setObraSocial] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useLoadMDBScript();

  useEffect(() => {
    loadObraSocial();
  }, [id]);

  const loadObraSocial = async () => {
    try {
      const obraObtenida = await fetchObraSocialById(parseInt(id));
      setObraSocial(obraObtenida);
    } catch (error) {
      console.log("Error, no se pudo obtener la obra social: ", error);
    }
  };

  const onSubmitEditObraSocial = async (obraSocialActualizada) => {
    try {
      showLoadingAlert("Actualizando...");
      const obraSocial = await updateObraSocial(id, obraSocialActualizada);
      MySwal.close();
      console.log("Obra social actualizada con exito: ", obraSocial);
      showSuccessAlert("La Obra Social ha sido actualizada exitosamente.");
      navigate("/obrasSociales");
    } catch (error) {
      MySwal.close();
      console.log("Error al actualizar una obra social: ", error);
      showErrorAlert("Error al intentar actualizar la Obra Social");
    }
  };

  if (!obraSocial) {
    return <Loading></Loading>;
  }

  return (
    <>
      <ObraSocialForm
        obraSocial={obraSocial}
        onSubmit={onSubmitEditObraSocial}
        isEdit={true}
      ></ObraSocialForm>
    </>
  );
};

export default ObraSocialEdit;
