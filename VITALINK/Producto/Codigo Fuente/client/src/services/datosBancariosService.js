import axios from "axios";
const urlBaseDatosBancarios = "http://localhost:8000/api/datosBancarios/";

export const fetchDatosBancarios = async () => {
  try {
    const res = await axios.get(urlBaseDatosBancarios);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo obtener los datos bancarios: ", error);
    throw new Error("Error en el feetching de los datos bancarios");
  }
};
/**
 * Servicio consumo de API para actualizar un pedido
 * @param {*} datosBancarios - Pasar datos bancarios actualizado
 * @returns - Retorna datos bancarios actualizado
 */
export const updateDatosBancarios = async (datosBancarios) => {
  try {
    const res = await axios.put(urlBaseDatosBancarios, datosBancarios);
    console.log("Datos Bancarios actualizados", res.data);
    return res.data; 
  } catch (error) {
    console.log("Error, no se pudo actualizar datos bancarios", error);
    throw new Error("Error al actualizar los datos bancarios");
  }
};
