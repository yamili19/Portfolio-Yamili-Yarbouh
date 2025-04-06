/**
 * Archivo controlador para manejar las peticiones para los tipos de cara disponibles
 */

const { tipoCaraModel } = require("../models");
const handleHttpError = require("../utils/handleError");

const getAllTiposCara = async (req, res) => {
  try {
    const tiposCara = await tipoCaraModel.findAll({});
    res.status(200).json(tiposCara);
  } catch (error) {
    console.log("Error, no se pudo obtener los tipos de cara: ", error);
    handleHttpError(res, "ERROR_GET_ALL_TIPOS_CARA", 500);
  }
};

module.exports = { getAllTiposCara };
