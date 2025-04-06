/**
 * Archivo que se utiliza para consumir la API del registro de donación
 */

import axios from "axios";

const urlBaseDonaciones = "http://localhost:8000/api/donaciones/";

/**
 * Consumo de la API para obtener todas las donaciones realizadas
 * @returns - Retorna las donaciones realizadas
 */
export const fetchDonaciones = async () => {
  try {
    const res = await axios.get(urlBaseDonaciones);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo obtener las donaciones realizadas: ", error);
    throw new Error("Error en el fetching de donaciones");
  }
};

/**
 * Servicio consumo de API para obtener una donación según la fecha
 * @param {*} fecha - Pasar la fecha de la donación a obtener
 * @returns - Retorna los datos de la donación de la fecha y el donante que realizo la donación
 */
export const fetchDonacionByFecha = async (fecha) => {
  try {
    const res = await axios.get(urlBaseDonaciones + fecha);
    console.log("Datos que se obtiene desde fetch: ", res.data);
    return res.data;
  } catch (error) {
    console.log("Error en el fetching by fecha para la donación: ", error);
    throw new Error("Error en el fetch by fecha para la donación");
  }
};

/**
 * Pasar el objeto donación para el registro
 * @param {*} donacion
 * @returns
 */
export const createDonacion = async (donacion) => {
  try {
    const res = await axios.post(urlBaseDonaciones, donacion);
    return res.data;
  } catch (error) {
    console.log("Error no se pudo registrar la donación");
    throw new Error("Error al registrar una nueva donación");
  }
};

/**
 * Servicio consumo API para actualizar una donación
 * @param {*} fechaDonacion - Pasar la fecha de la donación a actualizar
 * @param {*} donacion - Pasar el objeto donación a actualizar
 * @returns - Retorna los datos de la donación actualizado
 */
export const updateDonacion = async (fechaDonacion, donacion) => {
  try {
    const res = await axios.put(urlBaseDonaciones + fechaDonacion, donacion);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo actualizar la donación: ", error);
    throw new Error("Error al actualizar la donación");
  }
};

/**
 * Servicio consumo de API para eliminar una donación
 * @param {*} fecha - Pasar la fecha de la donación a eliminar
 * @returns - Retoran los datos de la donación eliminada
 */
export const deleteDonacion = async (fecha) => {
  try {
    const res = await axios.delete(urlBaseDonaciones + fecha);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo eliminar la donación: ", error);
    throw new Error("Error al eliminar la donación");
  }
};
