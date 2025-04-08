/**
 * Archivo que se utiliza como controlador para manejar la lógica de las peticiones del registro de pedido de peluca
 */

const { pedidoPelucaModel } = require("../models");
const handleHttpError = require("../utils/handleError");
const he = require('he');
const xss = require('xss');

const getAllPedidosPeluca = async (req, res) => {
  try {
    const pedidos = await pedidoPelucaModel.findAll({
      order: [['fechaPedido', 'DESC']],
    });
    
    // Decodificar solo los campos que son strings codificados
    const pedidosDecodificados = pedidos.map(pedido => {
      const pedidoDecodificado = {...pedido.dataValues};
      
      // Solo decodificar si el valor es un string
      if (typeof pedidoDecodificado.fechaPedido === 'string') {
        pedidoDecodificado.fechaPedido = he.decode(pedidoDecodificado.fechaPedido);
      }
      
      if (pedidoDecodificado.cantCabello && typeof pedidoDecodificado.cantCabello === 'string') {
        pedidoDecodificado.cantCabello = he.decode(pedidoDecodificado.cantCabello);
      }
      
      if (pedidoDecodificado.cantPelucasLlegaron && typeof pedidoDecodificado.cantPelucasLlegaron === 'string') {
        pedidoDecodificado.cantPelucasLlegaron = he.decode(pedidoDecodificado.cantPelucasLlegaron);
      }
      
      return pedidoDecodificado;
    });
    
    res.status(200).json(pedidosDecodificados);
  } catch (error) {
    console.log("Error, no se pudo obtener los pedidos de pelucas: ", error);
    handleHttpError(res, "ERROR_GET_ALL_PEDIDOS_PELUCA", 500);
  }
};

const getPedidoPelucaByFecha = async (req, res) => {
  try {
    const { fechaPedido } = req.params;
    
    // Buscar el pedido sin codificar la fecha (asumiendo que en la BD está sin codificar)
    const pedido = await pedidoPelucaModel.findByPk(fechaPedido);
    
    if (!pedido) {
      return handleHttpError(res, "ERROR_PEDIDO_NOT_FOUND", 404);
    }
    
    // Crear una copia del objeto para no modificar el original
    const pedidoResponse = {...pedido.dataValues};
    
    // Decodificar solo los campos que son strings y están codificados
    if (typeof pedidoResponse.fechaPedido === 'string') {
      try {
        pedidoResponse.fechaPedido = he.decode(pedidoResponse.fechaPedido);
      } catch (e) {
        // Si falla la decodificación, dejar el valor original
        console.log('El campo fechaPedido no necesitaba decodificación');
      }
    }
    
    // Repetir para otros campos si es necesario
    if (pedidoResponse.cantCabello && typeof pedidoResponse.cantCabello === 'string') {
      try {
        pedidoResponse.cantCabello = he.decode(pedidoResponse.cantCabello);
      } catch (e) {
        console.log('El campo cantCabello no necesitaba decodificación');
      }
    }
    
    res.status(200).json(pedidoResponse);
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
    // Solo codificar si es string
    const fechaCodificada = typeof fechaPedido === 'string' 
      ? he.encode(xss(fechaPedido)) 
      : fechaPedido;
    
    const cantCabelloCodificada = typeof cantCabello === 'string'
      ? he.encode(xss(cantCabello))
      : cantCabello.toString(); // Convertir números a string

    const existPedido = await pedidoPelucaModel.findOne({
      where: { fechaPedido: fechaCodificada },
    });
    
    if (existPedido) {
      return handleHttpError(res, "ERROR_PEDIDO_EXIST", 400);
    }

    const cantPelucasEstimadas = cantidadPelucasEstimadas(cantCabello);
    const pedido = {
      fechaPedido: fechaCodificada,
      cantCabello: cantCabelloCodificada,
      cantPelucasEstimadas,
      cantPelucasLlegaron: null,
    };
    
    const newPedidoPeluca = await pedidoPelucaModel.create(pedido);
    
    res.status(201).json({
      message: "Nuevo pedido de peluca registrado exitosamente",
      data: newPedidoPeluca, // No decodificar aquí, el frontend puede manejar la decodificación
    });
  } catch (error) {
    console.log("Error, no se pudo crear el pedido de peluca: ", error);
    handleHttpError(res, "ERROR_POST_PEDIDO_PELUCA", 500);
  }
};


const updatePedidoPeluca = async (req, res) => {
  const { fechaPedido } = req.params;
  const { cantPelucasLlegaron, cantCabello } = req.body;
  
  try {
    const pedido = await pedidoPelucaModel.findByPk(he.encode(xss(fechaPedido)));
    
    if (!pedido) {
      return handleHttpError(res, "ERROR_PEDIDO_NOT_FOUND", 404);
    }

    const newCantidadPelucasEstimadas = cantidadPelucasEstimadas(cantCabello);
    
    const pedidoActualizado = {
      cantCabello: he.encode(xss(cantCabello.toString())),
      cantPelucasEstimadas: newCantidadPelucasEstimadas,
      cantPelucasLlegaron: cantPelucasLlegaron ? he.encode(xss(cantPelucasLlegaron.toString())) : null,
    };

    await pedido.update(pedidoActualizado);
    
    // Decodificar para la respuesta
    const responseData = {
      ...pedido.dataValues,
      fechaPedido: he.decode(pedido.fechaPedido),
      cantCabello: he.decode(pedido.cantCabello),
      cantPelucasLlegaron: pedido.cantPelucasLlegaron ? he.decode(pedido.cantPelucasLlegaron) : null
    };
    
    res.status(200).json({ 
      message: "Pedido actualizado correctamente", 
      data: responseData 
    });
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
  const { fechaInicio, fechaFin } = req.params;
  try {
    // Codificar las fechas para la búsqueda
    const encodedInicio = he.encode(xss(fechaInicio));
    const encodedFin = he.encode(xss(fechaFin));
    
    const result = await pedidoPelucaModel.obtenerPedidosEntreFechas(encodedInicio, encodedFin);
    
    // Decodificar los resultados
    const resultDecodificado = result.map(item => ({
      ...item.dataValues,
      fechaPedido: he.decode(item.fechaPedido),
      cantCabello: item.cantCabello ? he.decode(item.cantCabello) : null,
      cantPelucasLlegaron: item.cantPelucasLlegaron ? he.decode(item.cantPelucasLlegaron) : null
    }));
    
    res.status(200).json(resultDecodificado);
  } catch (error) {
    console.log("Error al obtener pedidos entre fechas: ", error);
    handleHttpError(res, "ERROR_GET_PEDIDOS", 500);
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
