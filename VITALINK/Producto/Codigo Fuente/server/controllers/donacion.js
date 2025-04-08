/**
 * Archivo controlador para las donaciones
 */
const { sequelize } = require("../config/mariaDb");
const { donacionModel, donanteModel } = require("../models");
const handleHttpError = require("../utils/handleError");
const { sendEmailDonante, sendEmailCliente } = require("../config/emailer");
const he = require('he');
const xss = require('xss');
const { DateTime } = require('luxon');

/**
 * Pasar la Request y Response
 * @param {*} req
 * @param {*} res
 */
const getAllDonaciones = async (req, res) => {
  try {
    const donaciones = await donacionModel.findAllWithDonante();

    const sanitizedDonaciones = donaciones.map(donacion => {
      // Accede al donante usando el alias correcto ("Donante")
      const donante = donacion.Donante; // ¡Nota la "D" mayúscula!

      return {
        fecha: donacion.fecha,
        mail: donacion.mail,
        entidad: donacion.entidad ? he.encode(donacion.entidad) : null,
        mailEnviado: donacion.mailEnviado,
        donante: donante ? { // Solo si existe el donante
          mail: donante.mail ? he.encode(donante.mail) : null,
          nombre: donante.nombre ? he.encode(donante.nombre) : null,
          apellido: donante.apellido ? he.encode(donante.apellido) : null,
          telefono: donante.telefono ? he.encode(donante.telefono) : null,
        } : null, // Si no hay donante, se devuelve null
      };
    });

    res.status(200).json(sanitizedDonaciones);
  } catch (error) {
    console.log("Error al obtener donaciones: ", error);
    handleHttpError(res, "ERROR_GET_ALL_DONACIONES", 500);
  }
};

const getDonacionByFecha = async (req, res) => {
  try {
    const { fecha } = req.params;
    const donacion = await donacionModel.findWithDonante(fecha);

    if (!donacion) {
      return handleHttpError(res, "ERROR_DONACION_NOT_FOUND", 404);
    }

    const donante = donacion.Donante; // Alias con "D" mayúscula

    const sanitizedDonacion = {
      fecha: donacion.fecha,
      mail: donacion.mail,
      entidad: donacion.entidad ? he.encode(donacion.entidad) : null,
      mailEnviado: donacion.mailEnviado,
      donante: donante ? {
        mail: donante.mail ? he.encode(donante.mail) : null,
        nombre: donante.nombre ? he.encode(donante.nombre) : null,
        apellido: donante.apellido ? he.encode(donante.apellido) : null,
        telefono: donante.telefono ? he.encode(donante.telefono) : null,
      } : null,
    };

    res.status(200).json(sanitizedDonacion);
  } catch (error) {
    console.log("Error al obtener donación por fecha: ", error);
    handleHttpError(res, "ERROR_GET_BY_FECHA_DONACION", 500);
  }
};

const createDonacion = async (req, res) => {
  const { mail, entidad, telefono, nombre, apellido } = req.body;
  const fecha = DateTime.now().setZone('America/Argentina/Buenos_Aires');
  const transaction = await sequelize.transaction();

  try {
    // Sanitizar y hacer encoding de los datos antes de guardar
    const sanitizedMail = xss(he.encode(mail));
    const sanitizedEntidad = entidad ? xss(he.encode(entidad)) : null;
    const sanitizedTelefono = telefono ? xss(he.encode(telefono)) : null;
    const sanitizedNombre = nombre ? xss(he.encode(nombre)) : null;
    const sanitizedApellido = apellido ? xss(he.encode(apellido)) : null;

    let donante = await donanteModel.findOne({
      where: { mail: sanitizedMail },
      transaction,
    });

    if (!donante) {
      donante = await donanteModel.create(
        {
          mail: sanitizedMail,
          telefono: sanitizedTelefono,
          nombre: sanitizedNombre,
          apellido: sanitizedApellido,
        },
        { transaction }
      );
    }

    const emailSent = await sendEmailDonante(donante);
    const mailEnviado = emailSent;

    const newDonacion = await donacionModel.create(
      {
        fecha,
        mail: sanitizedMail,
        entidad: sanitizedEntidad,
        mailEnviado,
      },
      { transaction }
    );

    await transaction.commit();
    res.status(201).json(newDonacion);
  } catch (error) {
    await transaction.rollback();
    console.log("Error al registrar la donación: ", error);
    handleHttpError(res, "ERROR_POST_DONACION", 500);
  }
};

const updateDonacion = async (req, res) => {
  const { fecha } = req.params;
  const { mail, entidad, mailEnviado, telefono, nombre, apellido } = req.body;

  // Sanitizar y hacer encoding de los datos
  const sanitizedMail = xss(he.encode(mail));
  const sanitizedEntidad = entidad ? xss(he.encode(entidad)) : null;
  const sanitizedTelefono = telefono ? xss(he.encode(telefono)) : null;
  const sanitizedNombre = nombre ? xss(he.encode(nombre)) : null;
  const sanitizedApellido = apellido ? xss(he.encode(apellido)) : null;

  try {
    const donante = await donanteModel.findByPk(sanitizedMail);
    if (!donante) {
      return handleHttpError(res, "ERROR_DONANTE_NOT_FOUND", 404);
    }

    const donacion = await donacionModel.findOne({
      where: { fecha, mail: sanitizedMail },
    });

    if (!donacion) {
      return handleHttpError(res, "ERROR_DONACION_NOT_FOUND", 404);
    }

    // Actualizar con datos sanitizados
    await donacion.update({
      entidad: sanitizedEntidad,
      mailEnviado,
    });

    await donante.update({
      telefono: sanitizedTelefono,
      nombre: sanitizedNombre,
      apellido: sanitizedApellido,
    });

    const donacionJson = await donacionModel.findWithDonante(fecha);

    // Aplicar encoding a la respuesta
    const sanitizedResponse = {
      ...donacionJson,
      entidad: donacionJson.entidad ? he.encode(donacionJson.entidad) : null,
      donante: {
        ...donacionJson.donante,
        nombre: donacionJson.donante.nombre ? he.encode(donacionJson.donante.nombre) : null,
        apellido: donacionJson.donante.apellido ? he.encode(donacionJson.donante.apellido) : null,
        telefono: donacionJson.donante.telefono ? he.encode(donacionJson.donante.telefono) : null,
      },
    };

    res.status(200).json({
      message: "Donación actualizada con éxito",
      data: sanitizedResponse,
    });
  } catch (error) {
    console.log("Error al actualizar la donación: ", error);
    handleHttpError(res, "ERROR_PUT_DONACION", 500);
  }
};

const deleteDonacion = async (req, res) => {
  try {
    const { fecha } = req.params;
    const donacionRealizada = await donacionModel.findOne({ where: { fecha } });

    if (!donacionRealizada) {
      return handleHttpError(res, "ERROR_DONACION_NOT_FOUND", 404);
    }

    await donacionRealizada.destroy();
    res.status(200).json({
      message: "Donación eliminada con éxito",
      data: donacionRealizada,
    });
  } catch (error) {
    console.log("Error, no se pudo eliminar la donación: ", error);
    handleHttpError(res, "ERROR_DELETE_DONACION", 500);
  }
};

module.exports = {
  getAllDonaciones,
  getDonacionByFecha,
  createDonacion,
  updateDonacion,
  deleteDonacion,
};