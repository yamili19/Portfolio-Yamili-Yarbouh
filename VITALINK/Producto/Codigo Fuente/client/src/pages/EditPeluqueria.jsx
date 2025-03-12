import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  showConfirmationAlert,
  showErrorAlert,
  showSuccessAlert,
} from "../utils/sweetAlert";
import PeluqueriaForm from "../components/PeluqueriaForm";
import useLoadMDBScript from "../hooks/useLoadMDBScript";
import Loading from "../components/loading/Loading";

//RECORDATORIO: Mover cada fetching a la carpeta service y llamarlos desde el archivo correspondiente de dicha carpeta

const urlBasePeluquerias = "http://localhost:8000/api/peluquerias/";
const urlBaseBarrios = "http://localhost:8000/api/barrios/";

const EditPeluqueria = () => {
  const [peluqueria, setPeluqueria] = useState(null);
  const [barrios, setBarrios] = useState([]);
  const { nombre } = useParams();
  const navigate = useNavigate();

  useLoadMDBScript();

  useEffect(() => {
    fetchBarrios();
    fetchPeluqueria();
  }, [nombre]);

  const fetchBarrios = async () => {
    try {
      const res = await axios.get(urlBaseBarrios);
      setBarrios(res.data);
    } catch (error) {
      console.log("Error al intentar obtener los barrios: ", error);
    }
  };

  const fetchPeluqueria = async () => {
    try {
      const res = await axios.get(urlBasePeluquerias + nombre);
      setPeluqueria(res.data);
    } catch (error) {
      console.log("Error al intentar obtener la peluquería: ", nombre);
    }
  };

  const handleEditPeluqueria = async (peluqueria) => {
    showConfirmationAlert(async () => {
      try {
        await axios.put(urlBasePeluquerias + nombre, peluqueria);
        showSuccessAlert();
        navigate("/peluquerias");
      } catch (error) {
        console.log("ERROR, no se pudo editar la peluquería", error);
        showErrorAlert("Error al editar la peluquería");
      }
    });
  };

  if (!peluqueria || !barrios) {
    return <Loading></Loading>;
  }

  return (
    <div className="container mt-4">
      <PeluqueriaForm
        onSubmit={handleEditPeluqueria}
        peluqueria={peluqueria}
        barrios={barrios}
        isReadOnly={false}
      ></PeluqueriaForm>
    </div>
  );
};

export default EditPeluqueria;
