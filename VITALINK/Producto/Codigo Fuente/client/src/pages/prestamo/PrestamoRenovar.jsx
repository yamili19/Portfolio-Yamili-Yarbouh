import { useEffect, useState } from "react";
import PrestamoForm from "../../components/prestamo/PrestamoForm";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCiudad } from "../../services/ciudadService";
import { fetchPelucas } from "../../services/pelucaService";
import { fetchVinculo } from "../../services/vinculoService";
import { fetchObraSociales } from "../../services/obraSocialService";
import {
  fetchPrestamoByNro,
  updateRenovarPrestamo,
} from "../../services/prestamoService";
import { fetchEstadoPrestamo } from "../../services/estadoPrestamoService";
import {
  MySwal,
  showErrorAlert,
  showLoadingAlert,
  showSuccessAlert,
} from "../../utils/sweetAlertGeneralize";
import Loading from "../../components/loading/Loading";

const PrestamoRenovar = () => {
  const [ciudades, setCiudades] = useState([]);
  const [pelucas, setPelucas] = useState([]);
  const [vinculos, setVinculos] = useState([]);
  const [obrasSociales, setObrasSociales] = useState([]);
  const [prestamo, setPrestamo] = useState(null);
  const [estadosPrestamo, setEstadosPrestamo] = useState([]);
  const { nroPrestamo } = useParams();
  const navigate = useNavigate();
  //const navigate = useNavigate();

  useEffect(() => {
    loadPrestamo();
    loadEstadosPrestamo();
    loadCiudades();
    loadPelucas();
    loadVinculos();
    loadObrasSociales();
  }, [nroPrestamo]);

  const loadCiudades = async () => {
    try {
      const ciudadesData = await fetchCiudad();
      setCiudades(ciudadesData);
    } catch (error) {
      console.log("Error, no se pudo obtener las ciudades: ", error);
    }
  };

  const loadPelucas = async () => {
    try {
      const pelucasData = await fetchPelucas();
      setPelucas(pelucasData);
    } catch (error) {
      console.log("Error, no se pudo obtener las pelucas: ", error);
    }
  };

  const loadVinculos = async () => {
    try {
      const vinculosData = await fetchVinculo();
      setVinculos(vinculosData);
    } catch (error) {
      console.log("Error, no se pudo obtener los vinculos: ", error);
    }
  };

  const loadObrasSociales = async () => {
    try {
      const obraSocialesData = await fetchObraSociales();
      setObrasSociales(obraSocialesData);
    } catch (error) {
      console.log("Error, no se pudo obtener las obras sociales: ", error);
    }
  };
  const loadPrestamo = async () => {
    try {
      const prestamoObtenido = await fetchPrestamoByNro(nroPrestamo);
      console.log("Prestamo obtenido: ", prestamoObtenido);
      setPrestamo(prestamoObtenido);
    } catch (error) {
      console.log("Error, no se pudo obtener el préstamo");
    }
  };

  const loadEstadosPrestamo = async () => {
    try {
      const estados = await fetchEstadoPrestamo();
      setEstadosPrestamo(estados);
    } catch (error) {
      console.log("Error, no se pudo obtener los estados de préstamo: ", error);
    }
  };

  const onSubmitRenovarPrestamo = async (prestamoRenovado) => {
    const prestamoParaRenovar = {
      fechaDevolucion: prestamoRenovado.fechaDevolucion,
    };
    try {
      showLoadingAlert("Renovando Préstamo...");
      const prestamo = await updateRenovarPrestamo(
        nroPrestamo,
        prestamoParaRenovar
      );
      console.log("Préstamo renovado con éxito: ", prestamo);
      MySwal.close();
      showSuccessAlert("El Préstamo ha sido renovado exitosamente.");
      navigate("/prestamos");
    } catch (error) {
      MySwal.close();
      console.log("Error, no se pudo renovar el préstamo: ", error);
      showErrorAlert("Error al intentar renovar el préstamo.");
    }
  };

  if (
    !ciudades ||
    !pelucas ||
    !vinculos ||
    !obrasSociales ||
    !estadosPrestamo ||
    !prestamo
  ) {
    return <Loading></Loading>;
  }

  return (
    <>
      <PrestamoForm
        ciudades={ciudades}
        pelucas={pelucas}
        vinculos={vinculos}
        obrasSociales={obrasSociales}
        estadosPrestamos={estadosPrestamo}
        prestamoData={prestamo}
        onSubmit={onSubmitRenovarPrestamo}
        isEdit={false}
        isRenovar={true}
      ></PrestamoForm>
    </>
  );
};

export default PrestamoRenovar;
