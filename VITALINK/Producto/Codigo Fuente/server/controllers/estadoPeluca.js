const { estadoPelucaModel } = require("../models");
const handleHttpError = require("../utils/handleError");
const he = require('he');
const xss = require('xss');

const getAllEstadoPeluca = async (req, res) => {
  try {
    const estadosPeluca = await estadoPelucaModel.findAll({});
    // Sanitizar los datos antes de enviarlos
    const sanitizedData = estadosPeluca.map(item => ({
      ...item.dataValues,
      nombre: item.nombre ? he.decode(item.nombre) : null
    }));
    
    res.status(200).json(sanitizedData);
  } catch (error) {
    console.log("Error, no se pudo obtener los estados de pelucas: ", error);
    handleHttpError(res, "ERROR_GET_ALL_ESTADO_PELUCA", 500);
  }
};

module.exports = { getAllEstadoPeluca };
