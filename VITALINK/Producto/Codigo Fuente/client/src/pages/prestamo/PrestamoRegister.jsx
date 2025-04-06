import { useEffect, useState } from "react";
import PrestamoForm from "../../components/prestamo/PrestamoForm";
import { fetchCiudad } from "../../services/ciudadService";
import { fetchPelucasWithDisponibilidad } from "../../services/pelucaService";
import { fetchVinculo } from "../../services/vinculoService";
import { fetchObraSociales } from "../../services/obraSocialService";
import {
  MySwal,
  showErrorAlert,
  showLoadingAlert,
  showSuccessAlert,
} from "../../utils/sweetAlertGeneralize";
import { createPrestamo } from "../../services/prestamoService";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";

const PrestamoRegister = () => {
  const navigate = useNavigate();
  const [ciudades, setCiudades] = useState([]);
  const [pelucas, setPelucas] = useState([]);
  const [vinculos, setVinculos] = useState([]);
  const [obrasSociales, setObrasSociales] = useState([]);

  useEffect(() => {
    loadCiudades();
    loadPelucas();
    loadVinculos();
    loadObrasSociales();
  }, []);

  const loadCiudades = async () => {
    try {
      const ciudadesData = await fetchCiudad();
      setCiudades(ciudadesData);
    } catch (error) {
      console.log("Error, no se pudo obtener las ciudades: ", error);
    }
  };

  /*
  const loadPelucas = async () => {
    try {
      const pelucasData = await fetchPelucas();
      setPelucas(pelucasData);
    } catch (error) {
      console.log("Error, no se pudo obtener las pelucas: ", error);
    }
  }; 
  */

  //Se pasan solo las pelucas disponibles
  const loadPelucas = async () => {
    try {
      const pelucasData = await fetchPelucasWithDisponibilidad();
      const pelucasDisponibles = pelucasData.filter(
        (peluca) => peluca.estaDisponible
      );
      setPelucas(pelucasDisponibles);
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

  const onSubmitPrestamoRegister = async (prestamo) => {
    try {
      showLoadingAlert("Registrando Préstamo...");
      const prestamoData = {
        dni: Number(prestamo.dni),
        nombre: prestamo.nombre,
        apellido: prestamo.apellido,
        nroTelefono: Number(prestamo.nroTelefono),
        ciudad: Number(prestamo.ciudad),
        usuario: prestamo.usuario || null,
        codigoPeluca: Number(prestamo.codigoPeluca),
        vinculo: Number(prestamo.vinculo),
        obraSocial: prestamo.obraSocial ? Number(prestamo.obraSocial) : null,
      };
      const newPrestamo = await createPrestamo(prestamoData);
      console.log("Nuevo prestamo: ", newPrestamo);
      MySwal.close();
      showSuccessAlert("El Préstamo ha sido registrado exitosamente.");
      navigate("/prestamos");
    } catch (error) {
      MySwal.close();
      if (error.message === "ERROR_PELUCA_EN_PRESTAMO") {
        console.log("Error, peluca no disponible");
        showErrorAlert(
          "La Peluca seleccionada no se encuentra disponible en este momento."
        );
      } else {
        console.log("Error, no se pudo registrar el nuevo préstamo: ", error);
        showErrorAlert("Error al intentar registrar el Préstamo.");
      }
    }
  };

  if (!ciudades || !pelucas || !vinculos || !obrasSociales) {
    return <Loading></Loading>;
  }

  return (
    <>
      <PrestamoForm
        ciudades={ciudades}
        pelucas={pelucas}
        vinculos={vinculos}
        obrasSociales={obrasSociales}
        onSubmit={onSubmitPrestamoRegister}
        isEdit={false}
        isRenovar={false}
      ></PrestamoForm>
    </>
  );
};

export default PrestamoRegister;
