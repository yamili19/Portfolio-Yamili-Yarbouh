import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PeluqueriaForm from "../components/PeluqueriaForm";
//import "../css/register.css";
import useLoadMDBScript from "../hooks/useLoadMDBScript";
import Loading from "../components/loading/Loading";

//RECORDATORIO: Mover cada fetching a la carpeta service y llamarlos desde el archivo correspondiente de dicha carpeta

const urlBasePeluquerias = "http://localhost:8000/api/peluquerias/";
const urlBaseBarrios = "http://localhost:8000/api/barrios/";

const ConsultPeluqueria = () => {
  const { nombre } = useParams();
  const [peluqueria, setPeluqueria] = useState(null);
  const [barrios, setBarrios] = useState([]);

  useLoadMDBScript();

  //Se traen los barrios y la peluqueria con el nombre pasado por parametro desde el back
  useEffect(() => {
    fetchBarrios();
    fetchPeluqueria();
  }, [nombre]);

  const fetchBarrios = async () => {
    try {
      const res = await axios.get(urlBaseBarrios);
      console.log("Barrios desde el back: ", res.data);
      setBarrios(res.data);
    } catch (error) {
      console.log("ERROR, no se pudo recuperar los barrios");
    }
  };

  const fetchPeluqueria = async () => {
    try {
      const res = await axios.get(urlBasePeluquerias + nombre);
      setPeluqueria(res.data);
    } catch (error) {
      console.log("No se pudo obtener la peluquería con nombre: ", nombre);
    }
  };

  if (!peluqueria || !barrios) {
    return <Loading></Loading>;
  }

  return (
    <div className="container mt-4">
      <PeluqueriaForm
        peluqueria={peluqueria}
        isReadOnly={true}
        barrios={barrios}
      ></PeluqueriaForm>
    </div>
  );
};

export default ConsultPeluqueria;
