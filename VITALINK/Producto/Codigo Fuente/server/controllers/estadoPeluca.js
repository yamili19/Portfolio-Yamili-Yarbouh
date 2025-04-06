const { estadoPelucaModel } = require("../models");
const handleHttpError = require("../utils/handleError");

const getAllEstadoPeluca = async (req, res) => {
  try {
    const estadosPeluca = await estadoPelucaModel.findAll({});
    res.status(200).json(estadosPeluca);
  } catch (error) {
    console.log("Error, no se pudo obtener los estados de pelucas: ", error);
    handleHttpError(res, "ERROR_GET_ALL_ESTADO_PELUCA", 500);
  }
};

module.exports = { getAllEstadoPeluca };
