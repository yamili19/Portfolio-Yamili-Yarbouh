/**
 * Archivo controlador para el manejo de las peticiones para las pelucas
 */

const {
  pelucaModel,
  prestamoModel,
  tipoCaraXPelucaModel,
} = require("../models");
const handleHttpError = require("../utils/handleError");
const fs = require("fs");
const path = require("path");

const getAllPelucas = async (req, res) => {
  try {
    const pelucas =
      await pelucaModel.findAllPelucasWithTipoPeloAndEstadoPelucaAndTiposCaras();
    res.status(200).json(pelucas);
  } catch (error) {
    console.log("Error, no se pudo obtener las pelucas: ", error);
    handleHttpError(res, "ERROR_GET_ALL_PELUCAS", 500);
  }
};

const getAllPelucasWithPrestamoAndTypeFace = async (req, res) => {
  try {
    const pelucas =
      await pelucaModel.findAllPelucasWithTipoPeloAndEstadoPelucaAndTiposCaras();

    // Verificar la disponibilidad de cada peluca
    const pelucasConDisponibilidad = await Promise.all(
      pelucas.map(async (peluca) => {
        const estaDisponible = await prestamoModel.isPelucaDisponible(
          peluca.codigo
        );
        return {
          ...peluca, // Convertir a JSON para incluir el nuevo atributo
          estaDisponible,
        };
      })
    );

    res.status(200).json(pelucasConDisponibilidad);
  } catch (error) {
    console.log(
      "Error, no se pudo obtener las pelucas con la disponibilidad y el tipo de cara: ",
      error
    );
    handleHttpError(res, "ERROR_GET_ALL_PRESTAMO_TIPO_CARA", 500);
  }
};

const getAllPelucasWithPrestamo = async (req, res) => {
  try {
    // Obtener todas las pelucas con tipo de pelo y estado
    const pelucas =
      await pelucaModel.findAllPelucasWithTipoPeloAndEstadoPeluca();

    // Verificar la disponibilidad de cada peluca
    const pelucasConDisponibilidad = await Promise.all(
      pelucas.map(async (peluca) => {
        const estaDisponible = await prestamoModel.isPelucaDisponible(
          peluca.codigo
        );
        return {
          ...peluca.toJSON(), // Convertir a JSON para incluir el nuevo atributo
          estaDisponible,
        };
      })
    );

    res.status(200).json(pelucasConDisponibilidad);
  } catch (error) {
    console.log("Error, no se pudo obtener las pelucas: ", error);
    handleHttpError(res, "ERROR_GET_ALL_PELUCAS", 500);
  }
};

const getPelucaByCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;

    const peluca =
      await pelucaModel.findPelucaByCodigoWithTipoPeloAndEstadoPeluca(codigo);

    if (!peluca) {
      return handleHttpError(res, "ERROR_PELUCA_NOT_FOUND", 404);
    }

    res.status(200).json(peluca);
  } catch (error) {
    console.log("Error, no se pudo obtener la peluca por codigo: ", error);
    handleHttpError(res, "ERROR_GET_PELUCA_BY_CODE", 500);
  }
};

const createPeluca = async (req, res) => {
  try {
    const {
      talle,
      color,
      tipoPelo,
      fechaConfeccion,
      estadoPeluca,
      tieneApross,
      descripcion,
      tiposCara,
    } = req.body;
    const foto = req.file ? req.file.path : null;

    const newPeluca = await pelucaModel.create({
      talle,
      color,
      tipoPelo,
      fechaConfeccion,
      estadoPeluca,
      foto,
      tieneApross,
      descripcion,
    });

    if (Array.isArray(tiposCara) && tiposCara.length > 0) {
      await Promise.all(
        tiposCara.map(async (tipoCaraId) => {
          try {
            await tipoCaraXPelucaModel.create({
              codigo: newPeluca.codigo,
              tipo_cara_id: Number(tipoCaraId), // Convertir a Number
            });
          } catch (error) {
            console.error(
              `Error al crear tipo cara para peluca ${newPeluca.codigo}: `,
              error
            );
          }
        })
      );
    }

    res
      .status(201)
      .json({ message: "Peluca creada con éxito", data: newPeluca });
  } catch (error) {
    console.log("Error, no se pudo crear la peluca: ", error);
    handleHttpError(res, "ERROR_POST_PELUCA", 500);
  }
};

const updatePeluca = async (req, res) => {
  try {
    const { codigo } = req.params;
    const {
      talle,
      color,
      tipoPelo,
      fechaConfeccion,
      estadoPeluca,
      tieneApross,
      descripcion,
    } = req.body;
    const nuevaFoto = req.file ? req.file.path : null;

    const peluca = await pelucaModel.findByPk(codigo);

    if (!peluca) {
      return handleHttpError(res, "ERROR_PELUCA_NOT_FOUND", 404);
    }

    // Si se subió una nueva foto, elimina la anterior
    if (nuevaFoto && peluca.foto) {
      const filePath = path.join(
        __dirname,
        "..",
        "fotos",
        "pelucas",
        path.basename(peluca.foto)
      );
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await peluca.update({
      talle,
      color,
      tipoPelo,
      fechaConfeccion,
      estadoPeluca,
      foto: nuevaFoto || peluca.foto,
      tieneApross,
      descripcion,
    });

    res
      .status(200)
      .json({ message: "Peluca actualizada exitosamente", data: peluca });
  } catch (error) {
    console.log("Error, no se pudo actualizar la peluca: ", error);
    handleHttpError(res, "ERROR_PUT_PELUCA", 500);
  }
};

const deletePeluca = async (req, res) => {
  try {
    const { codigo } = req.params;

    const peluca = await pelucaModel.findByPk(codigo);

    if (!peluca) {
      return handleHttpError(res, "ERROR_PELUCA_NOT_FOUND", 404);
    }

    // Elimina la foto si existe
    if (peluca.foto) {
      // Construye la ruta del archivo
      const filePath = path.join(
        __dirname,
        "..",
        "fotos",
        "pelucas",
        path.basename(peluca.foto)
      );
      console.log("Ruta del archivo foto: ", filePath);
      // Verifica si el archivo existe antes de intentar eliminarlo
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await peluca.destroy();
    res
      .status(200)
      .json({ message: "Peluca eliminada exitosamente", data: peluca });
  } catch (error) {
    console.log("Error, no se pudo eliminar la peluca: ", error);
    handleHttpError(res, "ERROR_DELETE_PELUCA", 500);
  }
};

const getResumenPeluca = async (req, res) => {
  try {
    const resumenPeluca = await pelucaModel.obtenerResumenPeluca();
    res.status(200).json({ message: "Resumen de peluca", data: resumenPeluca });
  } catch (error) {
    console.log("Error, no se pudo obtener el resumen de pelucas: ", error);
    handleHttpError(res, "ERROR_GET_RESUMEN_PELUCA", 500);
  }
};

module.exports = {
  getAllPelucas,
  getPelucaByCodigo,
  getAllPelucasWithPrestamo,
  getAllPelucasWithPrestamoAndTypeFace,
  createPeluca,
  updatePeluca,
  deletePeluca,
  getResumenPeluca,
};
