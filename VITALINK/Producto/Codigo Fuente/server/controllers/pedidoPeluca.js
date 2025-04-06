/**
 * Archivo que se utiliza como controlador para manejar la lógica de las peticiones del registro de pedido de peluca
 */

const { pedidoPelucaModel } = require("../models");
const handleHttpError = require("../utils/handleError");

const getAllPedidosPeluca = async (req, res) => {
  try {
    const pedidos = await pedidoPelucaModel.findAll({
      order: [['fechaPedido', 'DESC']], // Cambia 'fechaPedido' por el campo que deseas ordenar
    });
    res.status(200).json(pedidos);
  } catch (error) {
    console.log("Error, no se pudo obtener los pedidos de pelucas: ", error);
    handleHttpError(res, "ERROR_GET_ALL_PEDIDOS_PELUCA", 500);
  }
};


const getPedidoPelucaByFecha = async (req, res) => {
  try {
    const { fechaPedido } = req.params;
    const pedido = await pedidoPelucaModel.findByPk(fechaPedido);
    if (!pedido) {
      return handleHttpError(res, "ERROR_PEDIDO_NOT_FOUND", 404);
    }
    res.status(200).json(pedido);
  } catch (error) {
    console.log("Error, no se pudo obtener el pedido de la fecha: ", error);
    handleHttpError(res, "ERROR_GET_BY_FECHA_PEDIDO_PELUCA", 500);
  }
};

/**
 * Función para calcular la cantidad de pelucas estimadas
 * @param {*} cantidadCabello - Cantidad de cabello en Kg
 * @returns - Cantidad de cabello estimada
 */
const cantidadPelucasEstimadas = (cantidadCabello) => {
  return Math.floor(cantidadCabello / 2);
};

const createPedidoPeluca = async (req, res) => {
  const { fechaPedido, cantCabello } = req.body;
  try {
    //Se verifica que no exista un pedido con la fecha ingresada
    const existPedido = await pedidoPelucaModel.findOne({
      where: { fechaPedido },
    });
    if (existPedido) {
      return handleHttpError(res, "ERROR_PEDIDO_EXIST", 400);
    }

    //Si no existe se procede a registrar el pedido
    const cantPelucasEstimadas = cantidadPelucasEstimadas(cantCabello);
    const pedido = {
      fechaPedido,
      cantCabello,
      cantPelucasEstimadas,
      cantPelucasLlegaron: null,
    };
    const newPedidoPeluca = await pedidoPelucaModel.create(pedido);
    res.status(201).json({
      message: "Nuevo pedido de peluca registrado exitosamente",
      data: newPedidoPeluca,
    });
  } catch (error) {
    console.log("Error, no se pudo crear el pedido de peluca: ", error);
    handleHttpError(res, "ERROR_POST_PEDIDO_PELUCA", 500);
  }
};

const updatePedidoPeluca = async (req, res) => {
  const { fechaPedido } = req.params;
  const { body } = req;
  try {
    //Se verifica si existe un pedido con la fecha ingresada
    const pedido = await pedidoPelucaModel.findByPk(fechaPedido);
    if (!pedido) {
      return handleHttpError(res, "ERROR_PEDIDO_NOT_FOUND", 404);
    }

    let cantLlegaron = null;
    if (body.cantPelucasLlegaron) {
      cantLlegaron = body.cantPelucasLlegaron;
    }
    //Si existe, se actualizan los datos
    const newCantidadPelucasEstimadas = cantidadPelucasEstimadas(
      body.cantCabello
    );

    const pedidoActualizado = {
      ...body,
      cantPelucasEstimadas: newCantidadPelucasEstimadas,
      cantPelucasLlegaron: cantLlegaron,
    };

    await pedido.update(pedidoActualizado);
    res
      .status(200)
      .json({ message: "Pedido actualizado correctamente", data: pedido });
  } catch (error) {
    console.log("Error, no se pudo actualizar el pedido: ", error);
    handleHttpError(res, "ERROR_PUT_PEDIDO", 500);
  }
};

const deletePedidoPeluca = async (req, res) => {
  try {
    const { fechaPedido } = req.params;
    const pedido = await pedidoPelucaModel.findByPk(fechaPedido);
    if (!pedido) {
      return handleHttpError(res, "ERROR_PEDIDO_NOT_FOUND", 404);
    }

    await pedido.destroy();
    res.status(200).json({
      message: "Pedido de peluca eliminada exitosamente",
      data: pedido,
    });
  } catch (error) {
    console.log("Error, no se pudo eliminar el pedido de peluca: ", error);
    handleHttpError(res, "ERROR_DELETE_PEDIDO", 500);
  }
};

const getPedidosEntreFechas = async (req, res) => {
  const {fechaInicio, fechaFin} = req.params;
  try{
    const result = await pedidoPelucaModel.obtenerPedidosEntreFechas(fechaInicio, fechaFin);
    res.status(200).json(result);
  }catch (error){
    console.log(
      "Error al intentar obtener los pedidos entre las fechas seleccionadas: ", error
    ); 
    handleHttpError(res, "ERROR_GET_PEDIDOS", 500)
  }
};

module.exports = {
  getAllPedidosPeluca,
  getPedidoPelucaByFecha,
  createPedidoPeluca,
  updatePedidoPeluca,
  deletePedidoPeluca,
  getPedidosEntreFechas,
};
