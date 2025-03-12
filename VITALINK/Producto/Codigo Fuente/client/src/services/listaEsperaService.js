import axios from "axios";

const urlBaseListaEspera = "http://localhost:8000/api/listaEspera/";

/**
 * Obtener toda la lista de espera
 */
export const fetchListaEspera = async () => {
  try {
    const res = await axios.get(urlBaseListaEspera);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo obtener la lista de espera: ", error);
    throw new Error("Error en el fetching de la lista de espera");
  }
};

/**
 * Obtener un registro de la lista de espera por su ID
 * @param {*} id
 * @returns
 */
export const fetchListaEsperaById = async (id) => {
  try {
    const res = await axios.get(`${urlBaseListaEspera}${id}`); 
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    console.log(
      "Error, no se pudo obtener el registro de la lista de espera con el ID ingresado: ",
      error
    );
    throw new Error("Error en el fetching de lista de espera by ID");
  }
};

/**
 * Crear un nuevo registro en la lista de espera
 * @param {*} data
 * @returns
 */
export const createListaEspera = async (data) => {
  try {
    const res = await axios.post(urlBaseListaEspera, data);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo crear el registro en la lista de espera: ", error);
    throw new Error("Error en la creación de lista de espera");
  }
};

/**
 * Eliminar un registro de la lista de espera por su NRO DE ORDEN
 * @param {*} nroOrden
 * @returns
 */
export const deleteListaEspera = async (nroOrden) => {
  try {
    await axios.delete(`${urlBaseListaEspera}${nroOrden}`); 
  } catch (error) {
    console.log("Error, no se pudo eliminar el registro de la lista de espera: ", error);
    throw new Error("Error en la eliminación de lista de espera");
  }
};
