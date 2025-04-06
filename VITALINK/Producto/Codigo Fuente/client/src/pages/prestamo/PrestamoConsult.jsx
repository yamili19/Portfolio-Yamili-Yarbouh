import { useEffect, useState } from "react";
import PrestamoEstructuraConsult from "../../components/prestamo/PrestamoEstructuraConsult";
import { useParams } from "react-router-dom";
import { fetchPrestamoByNro } from "../../services/prestamoService";

const PrestamoConsult = () => {
  const [prestamo, setPrestamo] = useState(null);
  const { nroPrestamo } = useParams();

  useEffect(() => {
    loadPrestamo();
  }, [nroPrestamo]);

  const loadPrestamo = async () => {
    try {
      const prestamoData = await fetchPrestamoByNro(nroPrestamo);
      setPrestamo(prestamoData);
    } catch (error) {
      console.log("Error, no se pudo obtener el préstamo: ", error);
    }
  };

  return (
    <>
      <PrestamoEstructuraConsult
        prestamo={prestamo}
      ></PrestamoEstructuraConsult>
    </>
  );
};

export default PrestamoConsult;
