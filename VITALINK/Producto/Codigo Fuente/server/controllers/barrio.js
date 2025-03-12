const { barrioModel } = require("../models");
const handleHttpError = require("../utils/handleError");

const getAllBarrios = async (req, res) => {
  try {
    const barrios = await barrioModel.findAll({});
    res.status(200).json(barrios);
  } catch (error) {
    console.log("Error al obtener barrios: ", error);
    handleHttpError(res, "ERROR_GET_ALL_BARRIOS", 500);
  }
};

module.exports = getAllBarrios;
