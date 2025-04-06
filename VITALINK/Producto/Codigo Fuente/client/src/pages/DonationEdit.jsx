import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchDonacionByFecha,
  updateDonacion,
} from "../services/donacionService";
import DonationForm from "../components/DonationForm";
import {
  MySwal,
  showErrorAlert,
  showLoadingAlert,
  showSuccessAlert,
} from "../utils/sweetAlertGeneralize";
import { fetchPeluquerias } from "../services/peluqueriaService";

const DonationEdit = () => {
  const [donacion, setDonacion] = useState(null);
  const [peluquerias, setPeluquerias] = useState([]);
  const { fecha } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadPeluquerias();
    loadDonacions();
  }, [fecha]);

  const loadDonacions = async () => {
    try {
      console.log("fecha en el load: ", fecha);
      const donacionData = await fetchDonacionByFecha(fecha);
      console.log("donacion data: ", donacionData);
      console.log("donacion punto data: ", donacionData.data);
      if (donacionData) {
        setDonacion(donacionData);
      } else {
        console.log("No se encontraron datos para la donación.");
        setDonacion(null); // Establece `null` explícitamente si no hay datos
      }
    } catch (error) {
      console.log(
        "Error, no se pudo obtener la donación con la fecha ingresada: ",
        error
      );
    }
  };

  //Se consume el servicio para obtener todas las peluquerías registradas en el sistema
  const loadPeluquerias = async () => {
    try {
      const peluqueriasData = await fetchPeluquerias();
      setPeluquerias(peluqueriasData);
    } catch (error) {
      console.log("Error en el fetching de peluquerías: ", error);
    }
  };

  const onSubmitEditDonacion = async (donacionActualizada) => {
    console.log("datos de la donacion a actualizar: ", donacionActualizada);
    const donacionParaActualizar = {
      mail: donacionActualizada.email,
      entidad: donacionActualizada.entidad || null,
      mailEnviado: true, //POR DEFECTO PARA LA PRUEBA ES TRUE,
      telefono: donacionActualizada.telefono,
      nombre: donacionActualizada.nombre,
      apellido: donacionActualizada.apellido,
    };
    try {
      showLoadingAlert("Actualizando...");
      const donacion = await updateDonacion(fecha, donacionParaActualizar);
      MySwal.close();
      console.log("Donacion actualizada con éxito: ", donacion);
      showSuccessAlert("La Donación ha sido actualizada exitosamente.");
      navigate("/donaciones");
    } catch (error) {
      MySwal.close();
      console.log("Error al intentar actualizar la donacion: ", error);
      showErrorAlert("Error al intentar actualizar la Donación.");
    }
  };
  return (
    <>
      <DonationForm
        donacionRealizada={donacion}
        onSubmit={onSubmitEditDonacion}
        peluquerias={peluquerias}
        isEdit={true}
      ></DonationForm>
    </>
  );
};

export default DonationEdit;
