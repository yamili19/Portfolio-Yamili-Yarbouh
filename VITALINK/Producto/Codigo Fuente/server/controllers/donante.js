/**
 * Archivo controlador para las acciones del donante
 */

const { donanteModel } = require("../models");
const handleHttpError = require("../utils/handleError");

const getAllDonantes = async (req, res) => {
  try {
    const donantes = await donanteModel.findAll({});
    res.status(200).json(donantes);
  } catch (error) {
    console.log("Error, no se pudo obtener los donantes");
    handleHttpError(res, "ERROR_GET_ALL_DONANTES", 500);
  }
};

const getDonanteByMail = async (req, res) => {
  try {
    const { mail } = req.params;
    const donante = await donanteModel.findOne({
      where: { mail },
    });

    if (!donante) {
      return handleHttpError(res, "ERROR_DONANTE_NOT_FOUND", 404);
    }

    res.status(200).json(donante);
  } catch (error) {
    console.log(
      "No se pudo obtener el donante con el email ingresado: ",
      error
    );
    handleHttpError(res, "ERROR_GET_DONANTE_BY_EMAIL", 500);
  }
};

module.exports = { getAllDonantes, getDonanteByMail };
