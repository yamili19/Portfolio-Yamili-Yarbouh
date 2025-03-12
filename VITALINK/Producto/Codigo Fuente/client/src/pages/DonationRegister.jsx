/**
 * Archivo jsx que representa la ruta /registrarDonacion (realiza la llamada del form correspondiente en components)
 */

import { useEffect, useState } from "react";
import DonationForm from "../components/DonationForm";
import { fetchPeluquerias } from "../services/peluqueriaService.js";

const DonationRegister = () => {
  const [peluquerias, setPeluquerias] = useState([]);

  //Se rendariza el componente para obtener las peluquerías
  useEffect(() => {
    loadPeluquerias();
  }, []);

  //Se consume el servicio para obtener todas las peluquerías registradas en el sistema
  const loadPeluquerias = async () => {
    try {
      const peluqueriasData = await fetchPeluquerias();
      setPeluquerias(peluqueriasData);
    } catch (error) {
      console.log("Error en el fetching de peluquerías: ", error);
    }
  };

  return (
    <>
      <DonationForm peluquerias={peluquerias} isEdit={false}></DonationForm>
    </>
  );
};

export default DonationRegister;
