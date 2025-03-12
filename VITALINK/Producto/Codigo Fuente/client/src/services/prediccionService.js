/**
 * Archivo que se usa para cosumir la api para obter la predicción del tipo de cara
 */

import axios from "axios";

const urlBasePrediccion = "http://localhost:8000/api/prediccion/";

/**
 * Consumo API para predecir el tipo de cara
 * @param {*} image - Pasar la imagen en formato base64
 * @returns - Retorna la predicción del tipo de cara
 */
export const prediccionModel = async (image) => {
  try {
    const res = await axios.post(urlBasePrediccion, image);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo predecir el tipo de cara: ", error);
    throw new Error("Error al predecir el tipo de cara");
  }
};
