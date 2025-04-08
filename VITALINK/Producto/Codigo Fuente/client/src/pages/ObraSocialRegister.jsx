import { useNavigate } from "react-router-dom";
import ObraSocialForm from "../components/ObraSocialForm";
import { createObraSocial } from "../services/obraSocialService";
import {
  MySwal,
  showErrorAlert,
  showLoadingAlert,
  showSuccessAlert,
} from "../utils/sweetAlertGeneralize";
import he from 'he';


const ObraSocialRegister = () => {
  const navigate = useNavigate();

  /**
   * Pasar la obra social a registrar en el sistema
   * @param {*} obraSocial
   */
  const onSubmitObraSocial = async (obraSocial) => {
    try {
      showLoadingAlert("Registrando...");
      const obraSocialData = {
        nombre: he.encode(obraSocial.nombre).toString(),
      };
      const newObraSocial = await createObraSocial(obraSocialData);
      MySwal.close();
      console.log("Registro obra social exitoso: ", newObraSocial);
      showSuccessAlert("La Obra Social ha sido registrada exitosamente.");
      //reset();
      navigate("/obrasSociales");
    } catch (error) {
      MySwal.close();
      console.log("Error al registrar una obra social: ", error);
      showErrorAlert("Error al intentar registrar la Obra Social");
    }
  };

  return (
    <>
      <ObraSocialForm
        onSubmit={onSubmitObraSocial}
        isEdit={false}
      ></ObraSocialForm>
    </>
  );
};

export default ObraSocialRegister;
