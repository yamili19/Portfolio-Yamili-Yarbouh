const { vinculoModel } = require("../models");
const handleHttpError = require("../utils/handleError");

const getAllVinculo = async (req, res) => {
  try {
    const vinculos = await vinculoModel.findAll({});
    res.status(200).json(vinculos);
  } catch (error) {
    console.log("Error, no se pudo obtener los vinculos: ", error);
    handleHttpError(res, "ERROR_GET_ALL_VINCULO", 500);
  }
};

module.exports = { getAllVinculo };
