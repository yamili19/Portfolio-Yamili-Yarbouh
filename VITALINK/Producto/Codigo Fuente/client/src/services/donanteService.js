/**
 * Archivo que se utiliza para consumir la API para obtner un donante según el mail ingresado
 */
import axios from "axios";

const urlBaseDonante = "http://localhost:8000/api/donantes/";

export const fetchDonantes = async () => {
  try {
    const res = await axios.get(urlBaseDonante);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo obtener los donantes: ", error);
    throw new Error("Error en el fetching de donantes");
  }
};

/**
 * Pasar el mail del donante a obtener
 * @param {*} mail
 * @returns
 */
export const fetchDonanteByEmail = async (mail) => {
  try {
    const res = await axios.get(urlBaseDonante + mail);
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    console.log(
      "Error, no se pudo obtener un donante con el email ingresado: ",
      error
    );
    throw new Error("Error en el fetching donante by email");
  }
};
