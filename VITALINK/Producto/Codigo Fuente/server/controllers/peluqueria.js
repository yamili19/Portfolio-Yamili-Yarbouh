const { sequelize } = require("../config/mariaDb");
const { peluqueriaModel } = require("../models");
const handleHttpError = require("../utils/handleError");
const he = require('he');
const xss = require('xss');

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
    const peluquerias = await peluqueriaModel.findAllWithBarrio();
    
    // Decodificar los campos que fueron codificados
    const peluqueriasDecoded = peluquerias.map(peluqueria => ({
      ...peluqueria.dataValues,
      nombre: he.decode(peluqueria.nombre),
      contacto: he.decode(peluqueria.contacto),
      nroCelular: peluqueria.nroCelular ? he.decode(peluqueria.nroCelular) : null,
      nroFijo: peluqueria.nroFijo ? he.decode(peluqueria.nroFijo) : null,
      calle: he.decode(peluqueria.calle)
    }));
    
    res.status(200).json(peluqueriasDecoded);
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

    // Decodificar los campos
    const peluqueriaDecoded = {
      ...peluqueria.dataValues,
      nombre: he.decode(peluqueria.nombre),
      contacto: he.decode(peluqueria.contacto),
      nroCelular: peluqueria.nroCelular ? he.decode(peluqueria.nroCelular) : null,
      nroFijo: peluqueria.nroFijo ? he.decode(peluqueria.nroFijo) : null,
      calle: he.decode(peluqueria.calle)
    };

    res.status(200).json(peluqueriaDecoded);
  } catch (error) {
    console.log("Error, no se pudo obtener la peluquería: ", error);
    handleHttpError(res, "ERROR_GET_PELUQUERIA_BY_NAME", 500);
  }
};
//MÉTODO POST
//TODO: /api/peluquerias
const createPeluqueria = async (req, res) => {
  try {
    const { nombre, contacto, nroCelular, nroFijo, barrio, calle, latitud, longitud } = req.body;
    
    const newPeluqueria = await peluqueriaModel.create({
      nombre: he.encode(xss(nombre)),
      contacto: he.encode(xss(contacto)),
      nroCelular: nroCelular ? he.encode(xss(nroCelular.toString())) : null,
      nroFijo: nroFijo ? he.encode(xss(nroFijo.toString())) : null,
      barrio: Number(barrio) || null,
      calle: he.encode(xss(calle)),
      latitud: latitud,
      longitud: longitud
    });
    
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
    const { contacto, nroCelular, nroFijo, barrio, calle, latitud, longitud } = req.body;
    
    const peluqueria = await peluqueriaModel.findByPk(nombre);

    if (!peluqueria) {
      return handleHttpError(res, "PELUQUERIA_NOT_FOUND", 404);
    }

    await peluqueria.update({
      nombre: he.encode(xss(nombre)),
      contacto: he.encode(xss(contacto)),
      nroCelular: nroCelular ? he.encode(xss(nroCelular.toString())) : null,
      nroFijo: nroFijo ? he.encode(xss(nroFijo.toString())) : null,
      barrio: Number(barrio) || null,
      calle: he.encode(xss(calle)),
      latitud: latitud,
      longitud: longitud
    });

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
