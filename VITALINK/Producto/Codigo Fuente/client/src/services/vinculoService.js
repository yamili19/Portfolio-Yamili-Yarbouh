import axios from "axios";
const urlBaseVinculo = "http://localhost:8000/api/vinculos/";

export const fetchVinculo = async () => {
  try {
    const res = await axios.get(urlBaseVinculo);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo obtener los vinculos: ", error);
    throw new Error("Error en el fetching de vinculos.");
  }
};
