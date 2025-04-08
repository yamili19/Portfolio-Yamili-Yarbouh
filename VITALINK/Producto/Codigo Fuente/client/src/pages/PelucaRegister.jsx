import { useEffect, useState } from "react";
import PelucaForm from "../components/PelucaForm";
import { fetchTipoPelo } from "../services/tipoPeloService";
import { fetchEstadoPeluca } from "../services/estadoPelucaService";
import {
  MySwal,
  showErrorAlert,
  showLoadingAlert,
  showSuccessAlert,
} from "../utils/sweetAlertGeneralize";
import { createPeluca } from "../services/pelucaService";
import { useNavigate } from "react-router-dom";
import { getAllTiposCara } from "../services/tipoCaraService";
import he from 'he';


const PelucaRegister = () => {
  const [tiposPelo, setTiposPelo] = useState([]);
  const [estadosPelucas, setEstadosPelucas] = useState([]);
  const [tiposCara, setTiposCara] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    loadTiposPelo();
    loadEstadosPeluca();
    loadTiposCara();
  }, []);

  const loadTiposPelo = async () => {
    try {
      const tipoDePelos = await fetchTipoPelo();
      setTiposPelo(tipoDePelos);
    } catch (error) {
      console.log("Error al obtener los tipos de Pelo: ", error);
    }
  };

  const loadEstadosPeluca = async () => {
    try {
      const estadosDePelucas = await fetchEstadoPeluca();
      setEstadosPelucas(estadosDePelucas);
    } catch (error) {
      console.log("Error al obtener los estados de peluca: ", error);
    }
  };

  const loadTiposCara = async () => {
    try {
      const tiposCaraData = await getAllTiposCara();
      setTiposCara(tiposCaraData);
    } catch (error) {
      console.log("Error al obtener los tipos de cara: ", error);
    }
  };

  const onSubmitPelucaRegister = async (peluca) => {
    try {
      showLoadingAlert("Registrando...");
      // Se Crea un objeto FormData para empaquetar todos los datos, incluido la foto
      const formData = new FormData();
      formData.append("talle", he.encode(peluca.talle));
      formData.append("color", he.encode(peluca.color));
      formData.append("tipoPelo", Number(peluca.tipoPelo));
      formData.append("fechaConfeccion", peluca.fechaConfeccion);
      formData.append("estadoPeluca", Number(peluca.estadoPeluca));
      formData.append("descripcion", he.encode(peluca.descripcion));

      if (peluca.tiposCara && peluca.tiposCara.length > 0) {
        peluca.tiposCara.forEach((tipoCaraId) => {
          formData.append("tiposCara[]", tipoCaraId);
        });
      }

      if (peluca.foto) {
        formData.append("fotoPeluca", peluca.foto);
      }

      formData.append("tieneApross", false); // Por defecto se ingresa como falso
      console.log("Datos de la peluca: ", formData);
      const newPeluca = await createPeluca(formData);
      console.log("Peluca registrada con éxito: ", newPeluca);
      MySwal.close();
      showSuccessAlert("La Peluca ha sido registrada exitosamente.");
      navigate("/pelucas");
    } catch (error) {
      MySwal.close();
      console.log("Error, no se pudo registrar la peluca: ", error);
      showErrorAlert("Error al intentar registrar la peluca.");
    }
  };
  return (
    <>
      <PelucaForm
        tiposPelo={tiposPelo}
        estadosPelucas={estadosPelucas}
        tiposCara={tiposCara}
        onSubmit={onSubmitPelucaRegister}
        isEdit={false}
      ></PelucaForm>
    </>
  );
};

export default PelucaRegister;
