/**
 * Archivo que se utiliza para el consumo de la API del pedidos de pelucas
 */

import axios from "axios";

const urlBasePedidoPeluca = "http://localhost:8000/api/pedidos/";

/**
 * Servicio consumo de API para devolver todos los pedidos realizados
 * @returns - Pedidos de pelucas realizados
 */
export const fetchPedidosPelucas = async () => {
  try {
    const res = await axios.get(urlBasePedidoPeluca);
    return res.data;
  } catch (error) {
    console.log(
      "Error, no se pudo realziar el fetch de pedidos de pelucas: ",
      error
    );
    throw new Error("Error en el fetching de pedidos de pelucas");
  }
};

/**
 * Servicio consumo de API para devolver un pedido por la fecha
 * @param {*} fechaPedido - Pasar la fecha del pedido a obtener
 * @returns - Devuelve el pedido de acuerdo a la fecha de interes
 */
export const fetchPedidoPelucaByFecha = async (fechaPedido) => {
  try {
    const res = await axios.get(urlBasePedidoPeluca + fechaPedido);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo realizar el fetch by fecha del pedido");
    throw new Error("Error en el fetching by fecha de pedidos de pelucas");
  }
};

/**
 * Servicio consumo de API registrar pedido de peluca
 * @param {*} pedido - Objeto pedido a registrar
 * @returns - Datos del pedido registrado
 */
export const createPedidoPeluca = async (pedido) => {
  try {
    const res = await axios.post(urlBasePedidoPeluca, pedido);
    return res.data;
  } catch (error) {
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.error === "ERROR_PEDIDO_EXIST"
    ) {
      console.log("Error, ya existe un pedido con esa fecha: ", error);
      throw new Error("ERROR_PEDIDO_EXIST");
    }
    console.log("Error, no se pudo crear el pedido de peluca: ", error);
    throw new Error("Error al crear el pedido de peluca");
  }
};

/**
 * Servicio consumo de API para actualizar un pedido
 * @param {*} fechaPedido - Pasar la fecha del pedido a actualizar
 * @param {*} pedido - Pasar el pedido actualizado
 * @returns - Retorna el pedido actualizado
 */
export const updatePedidoPeluca = async (fechaPedido, pedido) => {
  try {
    const res = await axios.put(urlBasePedidoPeluca + fechaPedido, pedido);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo actualizar el pedido: ", error);
    throw new Error("Error al actualizar el pedido de peluca");
  }
};

/**
 * Servicio consumo de API para eliminar un pedido
 * @param {*} fechaPedido - Pasar la fecha del pedido a eliminar
 * @returns - Retorna el pedido eliminado
 */
export const deletePedidoPeluca = async (fechaPedido) => {
  try {
    const res = await axios.delete(urlBasePedidoPeluca + fechaPedido);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo eliminar el pedido: ", error);
    throw new Error("Error al eliminar el pedido");
  }
};
/** 
* @param {*} fechaInicio
* @param {*} fechaFin
* @returns
*/

export const fetchPedidosEntreFechas = async (fechaInicio, fechaFin) => {
  try {
    const res = await axios.get(urlBasePedidoPeluca + fechaInicio + "/" + fechaFin)
    return res.data;
  } catch (error) {
    console.log("Error, no se pudieron obtener los prestamos", error);
    throw new Error("Error al eliminar el pedido");
  }
}