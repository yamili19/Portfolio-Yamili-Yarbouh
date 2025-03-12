const { tipoPeloModel } = require("../models");
const handleHttpError = require("../utils/handleError");

const getAllTipoPelo = async (req, res) => {
  try {
    const tiposPelo = await tipoPeloModel.findAll({});
    res.status(200).json(tiposPelo);
  } catch (error) {
    console.log("Error, no se pudo obtener los tipos de pelos: ", error);
    handleHttpError(res, "ERROR_GET_ALL_TIPO_PELO", 500);
  }
};

module.exports = { getAllTipoPelo };
