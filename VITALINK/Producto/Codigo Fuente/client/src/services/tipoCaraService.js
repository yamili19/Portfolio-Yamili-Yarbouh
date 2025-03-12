import axios from "axios";

const urlBase = "http://localhost:8000/api/tiposCara/";

export const getAllTiposCara = async () => {
  try {
    const res = await axios.get(urlBase);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo obtener los tipos de cara: ", error);
  }
};
