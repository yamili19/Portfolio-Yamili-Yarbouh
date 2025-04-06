/**
 * Archivo que se usa para consumir los servicios de API relacionados con los préstamo de pelucas
 */

import axios from "axios";
const urlBasePrestamo = "http://localhost:8000/api/prestamos/";

/**
 * Servicio consumo API para obtener todos los préstamos
 * @returns - Retorna los datos de todos los préstamos
 */
export const fetchPrestamo = async () => {
  try {
    const res = await axios.get(urlBasePrestamo);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo obtener los prestamos: ", error);
    throw new Error("Error en el fetching de préstamos");
  }
};

/**
 * Servicio consumo API para obtener los datos de un determinado préstamo
 * @param {*} nroPrestamo - Pasar el número del préstamo a obtener
 * @returns - Retorna los datos del préstamo de acuerdo al número de préstamo
 */
export const fetchPrestamoByNro = async (nroPrestamo) => {
  try {
    const res = await axios.get(urlBasePrestamo + nroPrestamo);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo obtener el prestamo por su número: ", error);
    throw new error("Error en el fetch de préstamo by nro");
  }
};

/**
 * Servicio consumo API para registrar un préstamo
 * @param {*} prestamo - Pasar el objeto prestamo a registrar
 * @returns - Retorna los datos del préstamo registrado
 */
export const createPrestamo = async (prestamo) => {
  try {
    const res = await axios.post(urlBasePrestamo, prestamo);
    return res.data;
  } catch (error) {
    if (
      error.response &&
      error.response.status === 409 &&
      error.response.data.error === "ERROR_PELUCA_EN_PRESTAMO"
    ) {
      console.log("Error, peluca no disponible: ", error.response.data.error);
      throw new Error("ERROR_PELUCA_EN_PRESTAMO");
    }
    console.log("Error, no se pudo registrar la préstamo: ", error);
    throw new Error("Error, no se pudo registrar el préstamo");
  }
};

/**
 * Servicio consumo API para actualizar un préstamo
 * @param {*} nroPrestamo - Pasar el número del préstamo a actualizar
 * @param {*} prestamo - Pasar el los datos del préstamo a actualizar
 * @returns - Retorna los datos del préstamo actualizado
 */
export const updatePrestamo = async (nroPrestamo, prestamo) => {
  try {
    const res = await axios.put(urlBasePrestamo + nroPrestamo, prestamo);
    return res.data;
  } catch (error) {
    if (
      error.response &&
      error.response.status === 409 &&
      error.response.data.error === "ERROR_PELUCA_EN_PRESTAMO"
    ) {
      console.log("Error, peluca no disponible: ", error.response.data.error);
      throw new Error("ERROR_PELUCA_EN_PRESTAMO");
    }
    console.log("Error, no se pudo actualziar el préstamo: ", error);
    throw new Error("Error, no se pudo actualizar el préstamo");
  }
};

/**
 * Servicio consumo API para renovar un préstamo
 * @param {*} nroPrestamo - Pasar el número del préstamo a renovar
 * @param {*} prestamo - Pasar el préstamo a renovar
 * @returns - Retorna el préstamo renovado
 */
export const updateRenovarPrestamo = async (nroPrestamo, prestamo) => {
  try {
    const res = await axios.put(
      urlBasePrestamo + "renovar/" + nroPrestamo,
      prestamo
    );
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo renovar el préstamo: ", error);
    throw new Error("Error, no se pudo renovar el préstamo: ", error);
  }
};

/**
 * Servicio consumo API para eliminar un préstamo
 * @param {*} nroPrestamo - Pasar el nroPrestamo del préstamo a eliminar
 * @returns - Retorna los datos del préstamo eliminado
 */
export const deletePrestamo = async (nroPrestamo) => {
  try {
    const res = await axios.delete(urlBasePrestamo + nroPrestamo);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo eliminar el préstamo: ", error);
    throw new Error("Error al intentar eliminar el préstamo");
  }
};

export const fetchResumenPrestamo = async () => {
  try {
    const res = await axios.get(
      urlBasePrestamo + "estadistico/resumenPrestamo"
    );
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo obtener el resumen de préstamos: ", error);
    throw new Error("Error en el fetching de resumen de préstamos");
  }
};
