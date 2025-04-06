import { useEffect, useState } from "react";
import PrestamoForm from "../../components/prestamo/PrestamoForm";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchPrestamoByNro,
  updatePrestamo,
} from "../../services/prestamoService";
import { fetchEstadoPrestamo } from "../../services/estadoPrestamoService";
import { fetchCiudad } from "../../services/ciudadService";
import { fetchPelucas } from "../../services/pelucaService";
import { fetchVinculo } from "../../services/vinculoService";
import { fetchObraSociales } from "../../services/obraSocialService";
import {
  MySwal,
  showErrorAlert,
  showLoadingAlert,
  showSuccessAlert,
} from "../../utils/sweetAlertGeneralize";
import Loading from "../../components/loading/Loading";

const PrestamoEdit = () => {
  const [ciudades, setCiudades] = useState([]);
  const [pelucas, setPelucas] = useState([]);
  const [vinculos, setVinculos] = useState([]);
  const [obrasSociales, setObrasSociales] = useState([]);
  const [prestamo, setPrestamo] = useState(null);
  const [estadosPrestamo, setEstadosPrestamo] = useState([]);
  const { nroPrestamo } = useParams();
  const navigate = useNavigate();

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

  const onSubmitEditPrestamo = async (prestamoActualizado) => {
    console.log(
      "Prestamo que se obtiene para hacer el nexo con el edit: ",
      prestamoActualizado
    );
    const prestamoParaActualizar = {
      nombre: prestamoActualizado.nombre.toString(),
      apellido: prestamoActualizado.apellido.toString(),
      nroTelefono: Number(prestamoActualizado.nroTelefono),
      ciudad: Number(prestamoActualizado.ciudad),
      codigoPeluca: Number(prestamoActualizado.codigoPeluca),
      vinculo: Number(prestamoActualizado.vinculo),
      obraSocial: prestamoActualizado.obraSocial
        ? Number(prestamoActualizado.obraSocial)
        : null,
      usuario: prestamoActualizado.usuario || null,
      fechaDevolucion: prestamoActualizado.fechaDevolucion,
      estadoPrestamo: Number(prestamoActualizado.estadoPrestamo),
    };
    try {
      showLoadingAlert("Actualizando Préstamo...");
      const prestamo = await updatePrestamo(
        nroPrestamo,
        prestamoParaActualizar
      );
      console.log("Prestamo actualizado: ", prestamo);
      MySwal.close();
      showSuccessAlert("El Préstamo ha sido actualizado exitosamente");
      navigate("/prestamos");
    } catch (error) {
      MySwal.close();
      if (error.message === "ERROR_PELUCA_EN_PRESTAMO") {
        console.log("Error, peluca no disponible");
        showErrorAlert(
          "La Peluca seleccionada no se encuentra disponible en este momento."
        );
      } else {
        console.log("Error, no se pudo actualizar el préstamo: ", error);
        showErrorAlert("Error al intentar actualizar el Préstamo.");
      }
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
        onSubmit={onSubmitEditPrestamo}
        isEdit={true}
        isRenovar={false}
      ></PrestamoForm>
    </>
  );
};

export default PrestamoEdit;
