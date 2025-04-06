const { afiliacionModel } = require("../models");
const handleHttpError = require("../utils/handleError");

const getAllAfiliacion = async (req, res) => {
  try {
    const afiliaciones = await afiliacionModel.findAll({});
    res.status(200).json(afiliaciones);
  } catch (error) {
    console.log("Error, no se pudo obtenere las afiliacones: ", error);
    handleHttpError(res, "ERROR_GET_ALL_AFILIACION", 500);
  }
};

module.exports = { getAllAfiliacion };
