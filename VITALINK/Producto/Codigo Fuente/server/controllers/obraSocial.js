/**
 * Archivo controlador para el manejo de las Obras Sociales
 */

const { obraSocialModel } = require("../models");
const handleHttpError = require("../utils/handleError");
const he = require('he');
const xss = require('xss');

const getAllObrasSociales = async (req, res) => {
  try {
    const obrasSociales = await obraSocialModel.findAll({});
    
    // Decodificar los nombres antes de enviar la respuesta
    const obrasDecodificadas = obrasSociales.map(obra => ({
      ...obra.dataValues,
      nombre: he.decode(obra.nombre) // Decodificar el nombre
    }));
    
    res.status(200).json(obrasDecodificadas);
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

    // Decodificar el nombre antes de enviar
    const obraDecodificada = {
      ...obraSocial.dataValues,
      nombre: he.decode(obraSocial.nombre)
    };

    res.status(200).json(obraDecodificada);
  } catch (error) {
    console.log("Error, no se pudo obtener la obra social con ese ID: ", error);
    handleHttpError(res, "ERROR_GET_OBRA_SOCIAL_BY_ID", 500);
  }
};

const createObraSocial = async (req, res) => {
  try {
    const { nombre } = req.body;
    const newObraSocial = await obraSocialModel.create({ 
      nombre: he.encode(xss(nombre))
    });

    // Decodificar para la respuesta
    const responseData = {
      ...newObraSocial.dataValues,
      nombre: he.decode(newObraSocial.nombre)
    };

    res.status(201).json({
      message: "Nueva obra social creada exitosamente",
      data: responseData
    });

  } catch (error) {
    console.log("Error, no se pudo crear una nueva social: ", error);
    handleHttpError(res, "ERROR_POST_OBRA_SOCIAL", 500);
  }
};

const updateObraSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const obraSocial = await obraSocialModel.findByPk(id);

    if (!obraSocial) {
      return handleHttpError(res, "ERROR_OBRA_SOCIAL_NOT_FOUND", 404);
    }

    await obraSocial.update({
      nombre: he.encode(xss(nombre)) // Codificar al actualizar
    });
    
    // Decodificar para la respuesta
    const responseData = {
      ...obraSocial.dataValues,
      nombre: he.decode(obraSocial.nombre)
    };
    
    res.status(200).json(responseData);
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
