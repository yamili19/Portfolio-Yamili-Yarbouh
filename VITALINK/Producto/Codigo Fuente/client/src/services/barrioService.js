import axios from "axios";

//RECORDATORIO: generalizar el tema del puerto, en caso de que el 8000 no este disponible
const urlBaseBarrios = "http://localhost:8000/api/barrios/";

const fetchBarrios = async () => {
  try {
    const res = await axios.get(urlBaseBarrios);
    return res.data;
  } catch (error) {
    console.log("ERROR, no se pudo obtener los barrios: ", error);
    throw new Error("Error fetching barrios");
  }
};

export default fetchBarrios;
