import axios from "axios";

const urlBaseClientes = "http://localhost:8000/api/clientes/";

export const fetchClientes = async () => {
  try {
    const res = await axios.get(urlBaseClientes);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo obtener los clientes: ", error);
    throw new Error("Error en el fetching de clientes");
  }
};

/**
 * Pasar el mail del donante a obtener
 * @param {*} dni
 * @returns
 */
export const fetchClienteByDni = async (dni) => {
  try {
    const res = await axios.get(urlBaseClientes + dni);
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    console.log(
      "Error, no se pudo obtener un cliente con el dni ingresado: ",
      error
    );
    throw new Error("Error en el fetching cliente by dni");
  }
};
