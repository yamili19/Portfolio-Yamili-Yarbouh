import axios from "axios";
const urlBaseTipoPelo = "http://localhost:8000/api/tipoPelo/";

export const fetchTipoPelo = async () => {
  try {
    const res = await axios.get(urlBaseTipoPelo);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo obtener los tipos de pelo");
    throw new Error("Error en fetching de tipos de pelos");
  }
};
