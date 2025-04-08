const { tipoPeloModel } = require("../models");
const handleHttpError = require("../utils/handleError");

const getAllTipoPelo = async (req, res) => {
  try {
    const tiposPelo = await tipoPeloModel.findAll({});
    // Sanitizar los datos antes de enviarlos
    const sanitizedData = tiposPelo.map(item => ({
      ...item.dataValues,
      nombre: item.nombre ? he.decode(item.nombre) : null
    }));
    
    res.status(200).json(sanitizedData);
  } catch (error) {
    console.log("Error, no se pudo obtener los tipos de pelos: ", error);
    handleHttpError(res, "ERROR_GET_ALL_TIPO_PELO", 500);
  }
};

module.exports = { getAllTipoPelo };
