const { sequelize } = require("../config/mariaDb");
const { peluqueriaModel } = require("../models");
const handleHttpError = require("../utils/handleError");

/**
 * req: Request, res: Response
 * @param {*} req
 * @param {*} res
 */

/**
 * A TODO AGREGAR MEDCHED DE DATOS
 */

//TODO: /api/peluquerias
const getAllPeluquerias = async (req, res) => {
  try {
    //const peluquerias = await peluqueriaModel.findAll({});
    const peluquerias = await peluqueriaModel.findAllWithBarrio();
    res.status(200).json(peluquerias);
  } catch (error) {
    console.log("El error es: ", error);
    handleHttpError(res, "ERROR_GET_ALL_PELUQUERIAS", 500);
  }
};

//TODO: /api/peluquerias/:nombre
const getPeluqueriaByName = async (req, res) => {
  try {
    const { nombre } = req.params;
    const decodedName = decodeURIComponent(nombre);
    const peluqueria = await peluqueriaModel.findWithBarrio(decodedName);

    if (!peluqueria) {
      handleHttpError(res, "ERROR_PELUQUERIA_NOT_FOUND", 404);
    }

    res.status(200).json(peluqueria);
  } catch (error) {
    console.log("Error, no se pudo obtener la peluquería: ", error);
    handleHttpError(res, "ERROR_GET_PELUQUERIA_BY_NAME", 500);
  }
};

//MÉTODO POST
//TODO: /api/peluquerias
const createPeluqueria = async (req, res) => {
  try {
    const { body } = req;
    const newPeluqueria = await peluqueriaModel.create(body);
    res.status(201).json(newPeluqueria);
  } catch (error) {
    console.log("Error: ", error);
    handleHttpError(res, "ERROR_POST_PELUQUERIA", 500);
  }
};

//MÉTODO PUT
//TODO: /api/peluquerias/:nombre
const updatePeluqueria = async (req, res) => {
  try {
    const { nombre } = req.params;
    const { body } = req;
    const peluqueria = await peluqueriaModel.findByPk(nombre);

    if (!peluqueria) {
      handleHttpError(res, "PELUQUERIA_NOT_FOUND", 404);
    }

    await peluqueria.update(body);
    res.status(200).json(peluqueria);
  } catch (error) {
    console.log("Error: ", error);
    handleHttpError(res, "ERROR_UPDATE_PELUQUERIA", 500);
  }
};

//TODO: /api/peluquerias/:nombre
//MÉTODO DELETE
const deletePeluqueria = async (req, res) => {
  try {
    const { nombre } = req.params;
    const removePeluqueria = await peluqueriaModel.findByPk(nombre);

    if (!removePeluqueria) {
      return handleHttpError(res, "ERROR_PELUQUERIA_NOT_FOUND", 404);
    }

    await removePeluqueria.destroy();
    res.status(200).json({
      message: "Peluqueria eliminada correctamente",
      data: removePeluqueria,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_DELETE_PELUQUERIAS", 500);
  }
};

module.exports = {
  getAllPeluquerias,
  getPeluqueriaByName,
  createPeluqueria,
  updatePeluqueria,
  deletePeluqueria,
};
