/**
 * Archivo que se utiliza para consumir la API sobre las pelucas
 */

import axios from "axios";
const urlBasePeluca = "http://localhost:8000/api/pelucas/";

/**
 * Servicio consumo de API para obtener las pelucas
 * @returns - Retorna los datos de las pelucas
 */
export const fetchPelucas = async () => {
  try {
    const res = await axios.get(urlBasePeluca);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo obtenre las pelucas: ", error);
    throw new Error("Error en el fetching de pelucas");
  }
};

export const fetchPelucasWithDisponibilidad = async () => {
  try {
    const res = await axios.get(urlBasePeluca + "disponible");
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo obtener las pelucas disponibles: ", error);
    throw new Error("Error en el fetching de pelucas con disponibilidad");
  }
};

export const fetchPelucasWithDisponibilidadAndTypeFace = async () => {
  try {
    const res = await axios.get(urlBasePeluca + "disponible/tipoCara");
    return res.data;
  } catch (error) {
    console.log("Error, al intentar obtener las pelucas recomendadas: ", error);
    throw new Error("Error en el fetching de pelucas recomendadas");
  }
};

/**
 * Servicio consumo de API para obtner una peluca en particular
 * @param {*} codigo - Pasar el código de la peluca a obtener
 * @returns - Retorna los datos de peluca con dicho código
 */
export const fetchPelucaByCodigo = async (codigo) => {
  try {
    const res = await axios.get(urlBasePeluca + codigo);
    //console.log("Datos res peluca: ", res.data);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo obtener la peluca: ", error);
    throw new Error("Error en el fetch de peluca by código");
  }
};

/**
 * Servicio consumo de API para crear una peluca
 * @param {*} peluca - Pasar el objeto peluca a crear
 * @returns - Retorna los datos de la peluca creada
 */
export const createPeluca = async (peluca) => {
  try {
    const res = await axios.post(urlBasePeluca, peluca, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error al crear la peluca: ", error);
    throw new Error("Error al crear la peluca");
  }
};

/**
 * Servicio consumo API para actualizar una peluca
 * @param {*} codigo - Pasar el código de la peluca a actualizar
 * @param {*} peluca - Pasar el objeto peluca con los datos actualizados
 * @returns - Retorna los datos de la peluca actualizado
 */
export const updatePeluca = async (codigo, peluca) => {
  try {
    const res = await axios.put(urlBasePeluca + codigo, peluca);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo actualizar la peluca: ", error);
    throw new Error("Error al actualizar la peluca");
  }
};

/**
 * Servicio consumo API para eliminar una peluca
 * @param {*} codigo - Pasar el código de la peluca a eliminar
 * @returns - Retoran los datos de la peluca eliminada
 */
export const deletePeluca = async (codigo) => {
  try {
    const res = await axios.delete(urlBasePeluca + codigo);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo eliminar la peluca: ", error);
    throw new Error("Error al eliminar la peluca");
  }
};

export const fetchResumenPelucas = async () => {
  try {
    const res = await axios.get(urlBasePeluca + "estadistico/resumenPeluca");
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo obtener el resumen de pelucas: ", error);
    throw new Error("Error en el fetching de resumen de pelucas");
  }
};
