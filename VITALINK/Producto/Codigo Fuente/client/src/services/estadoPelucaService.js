import axios from "axios";
const urlBaseEstadoPeluca = "http://localhost:8000/api/estadoPeluca/";

export const fetchEstadoPeluca = async () => {
  try {
    const res = await axios.get(urlBaseEstadoPeluca);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo obtener los estados de pelucas: ", error);
    throw new error("Error en el fetching de estados de pelucas");
  }
};
