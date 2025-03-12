/**
 * Archivo para definir los servicios a consumir desde front para las Obras Sociales
 */

import axios from "axios";

const urlBaseObrasSociales = "http://localhost:8000/api/obras/";

export const fetchObraSociales = async () => {
  try {
    const res = await axios.get(urlBaseObrasSociales);
    return res.data;
  } catch (error) {
    console.log(
      "Error, no se pudo realizar el fetching de las obras sociales: ",
      error
    );
    throw new Error("Error fetching obras sociales");
  }
};

/**
 * Pasar el id de la obra social que se quiere obtener
 * @param {*} id
 * @returns
 */
export const fetchObraSocialById = async (id) => {
  try {
    const res = await axios.get(urlBaseObrasSociales + id);
    return res.data;
  } catch (error) {
    console.log(
      "Error, no se pudo realizar el fetching by id para una obra social: ",
      error
    );
    throw new Error("Error fetching by id obras sociales");
  }
};

/**
 * Pasar el objeto de la obra social
 * @param {*} obraSocial
 * @returns
 * Retorna los datos del objeto de la obra social creado
 */
export const createObraSocial = async (obraSocial) => {
  try {
    const res = await axios.post(urlBaseObrasSociales, obraSocial);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo crear la obra social: ", error);
    throw new Error("Error al crear la obra social");
  }
};

/**
 * Pasar el id de la obra social a actualizar y el objeto en si mismo
 * @param {*} id
 * @returns
 * Retorna los datos de la obra social actualizada
 */
export const updateObraSocial = async (id, obraSocial) => {
  try {
    const res = await axios.put(urlBaseObrasSociales + id, obraSocial);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo actualizar la obra social: ", error);
    throw new Error("Error al actualizar la obra social");
  }
};

/**
 * Pasar el id de la obra social a eliminar
 * @param {*} id
 * @returns
 * Retorna los datos de la obra social eliminada
 */
export const deleteObraSocial = async (id) => {
  try {
    const res = await axios.delete(urlBaseObrasSociales + id);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo eliminar la obra social: ", error);
    throw new Error("Error al eliminar la obra social");
  }
};
