/**
 * Archivo controlador para el manejo de las Obras Sociales
 */

const { obraSocialModel } = require("../models");
const handleHttpError = require("../utils/handleError");

const getAllObrasSociales = async (req, res) => {
  try {
    const obrasSociales = await obraSocialModel.findAll({});
    res.status(200).json(obrasSociales);
  } catch (error) {
    console.log("Error, no se pudo obtener las obras sociales: ", error);
    handleHttpError(res, "ERROR_GET_ALL_OBRAS_SOCIALES", 500);
  }
};

const getObraSocialById = async (req, res) => {
  try {
    const { id } = req.params;
    const obraSocial = await obraSocialModel.findByPk(id);

    if (!obraSocial) {
      return handleHttpError(res, "ERROR_OBRA_SOCIAL_NOT_FOUND", 404);
    }

    res.status(200).json(obraSocial);
  } catch (error) {
    console.log("Error, no se pudo obtener la obra social con ese ID: ", error);
    handleHttpError(res, "ERROR_GET_OBRA_SOCIAL_BY_ID", 500);
  }
};

const createObraSocial = async (req, res) => {
  try {
    const { body } = req;
    const newObraSocial = await obraSocialModel.create(body);
    res.status(201).json({
      message: "Nueva obra social creada existosamente",
      data: newObraSocial,
    });
  } catch (error) {
    console.log("Error, no se pudo crear una nueva social: ", error);
    handleHttpError(res, "ERROR_POST_OBRA_SOCIAL", 500);
  }
};

const updateObraSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const obraSocial = await obraSocialModel.findByPk(id);

    if (!obraSocial) {
      return handleHttpError(res, "ERROR_OBRA_SOCIAL_NOT_FOUND", 404);
    }

    await obraSocial.update(body);
    res.status(200).json(obraSocial);
  } catch (error) {
    console.log("Error, no se pudo actualizar la obra social: ", error);
    handleHttpError(res, "ERROR_PUT_OBRA_SOCIAL", 500);
  }
};

const deleteObraSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const obraSocial = await obraSocialModel.findByPk(id);

    if (!obraSocial) {
      return handleHttpError(res, "ERROR_OBRA_SOCIAL_NOT_FOUND", 404);
    }
    await obraSocial.destroy();
    res.status(200).json({
      message: "Obra Social eliminada correctamente",
      data: obraSocial,
    });
  } catch (error) {
    console.log("Error, no se pudo eliminar la obra social: ", error);
    handleHttpError(res, "ERROR_DELETE_OBRA_SOCIAL", 500);
  }
};

module.exports = {
  getAllObrasSociales,
  getObraSocialById,
  createObraSocial,
  updateObraSocial,
  deleteObraSocial,
};
