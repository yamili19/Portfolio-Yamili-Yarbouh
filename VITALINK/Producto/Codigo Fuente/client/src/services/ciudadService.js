import axios from "axios";
const urlBaseCiudad = "http://localhost:8000/api/ciudades/";

export const fetchCiudad = async () => {
  try {
    const res = await axios.get(urlBaseCiudad);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo obtener las ciudades: ", error);
    throw new Error("Error en el fetching de ciudades");
  }
};
