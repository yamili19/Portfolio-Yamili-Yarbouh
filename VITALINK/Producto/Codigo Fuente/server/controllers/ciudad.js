const { ciudadModel } = require("../models");
const handleHttpError = require("../utils/handleError");

const getAllCiudad = async (req, res) => {
  try {
    const ciudades = await ciudadModel.findAll({});
    res.status(200).json(ciudades);
  } catch (error) {
    console.log("Error, no se pudo obtener las ciudades: ", error);
    handleHttpError(res, "ERROR_GET_ALL_CIUDAD", 500);
  }
};

module.exports = { getAllCiudad };
