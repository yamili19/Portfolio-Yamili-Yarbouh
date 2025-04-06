/**
 * Archivo controlador para las donaciones
 */
const { sequelize } = require("../config/mariaDb");
const { donacionModel, donanteModel } = require("../models");
const handleHttpError = require("../utils/handleError");
const { sendEmailDonante, sendEmailCliente } = require("../config/emailer");

/**
 * Pasar la Request y Response
 * @param {*} req
 * @param {*} res
 */
const getAllDonaciones = async (req, res) => {
  try {
    const donaciones = await donacionModel.findAllWithDonante();
    res.status(200).json(donaciones);
  } catch (error) {
    console.log("Error, no se pudo obtener las donaciones: ", error);
    handleHttpError(res, "ERRROR_GET_ALL_DONACIONES", 500);
  }
};

const getDonacionByFecha = async (req, res) => {
  try {
    const { fecha } = req.params;
    const donacion = await donacionModel.findWithDonante(fecha);
    if (!donacion) {
      return handleHttpError(res, "ERROR_DONACION_NOT_FOUND", 404);
    }
    res.status(200).json(donacion);
  } catch (error) {
    console.log("Error, no se pudo obtener la donacion con esa fecha: ", error);
    handleHttpError(res, "ERROR_GET_BY_FECHA_DONACION", 500);
  }
};

const createDonacion = async (req, res) => {
  //const { mail, entidad } = req.body;
  const { mail, entidad, telefono, nombre, apellido } = req.body;
  const fecha = new Date();
  //Se define la transacción
  const transaction = await sequelize.transaction();
  try {
    //Se verifica si el donante ya existe
    let donante = await donanteModel.findOne({
      where: { mail },
      transaction,
    });

    // Si el donante no existe, se crea uno nuevo
    if (!donante) {
      donante = await donanteModel.create(
        {
          mail,
          telefono,
          nombre,
          apellido,
        },
        { transaction }
      );
    }
    //Se envía el correo y se verifica el estadio del envío
    const emailSent = await sendEmailDonante(donante);
    const mailEnviado = emailSent;

    //Se crea la nueva donación
    const newDonacion = await donacionModel.create(
      {
        fecha,
        mail,
        entidad,
        mailEnviado,
      },
      {
        transaction,
      }
    );

    await transaction.commit();
    res.status(201).json(newDonacion);
  } catch (error) {
    await transaction.rollback();
    console.log("Error, no se pudo registrar la donación: ", error);
    handleHttpError(res, "ERROR_POST_DONACION", 500);
  }
};

const updateDonacion = async (req, res) => {
  const { fecha } = req.params;
  const { mail, entidad, mailEnviado, telefono, nombre, apellido } = req.body;

  // Se convierte la fecha a formato 'YYYY-MM-DD HH:MM:SS'
  const fechaDate = new Date(fecha);
  const formattedFecha = `${fechaDate.getFullYear()}-${String(
    fechaDate.getMonth() + 1
  ).padStart(2, "0")}-${String(fechaDate.getDate()).padStart(2, "0")} ${String(
    fechaDate.getHours()
  ).padStart(2, "0")}:${String(fechaDate.getMinutes()).padStart(
    2,
    "0"
  )}:${String(fechaDate.getSeconds()).padStart(2, "0")}.000`; // Incluyendo milisegundos

  try {
    //Se verifica si existe el donante
    const donante = await donanteModel.findByPk(mail);
    if (!donante) {
      return handleHttpError("res", "ERROR_DONANTE_NOT_FOUND", 404);
    }

    //Si existe, se verifica la donacion hecha por el donante con la fecha del parametro
    const donacion = await donacionModel.findOne({
      where: { fecha: formattedFecha, mail },
    });
    console.log("Donacion obtenida: ", JSON.stringify(donacion));
    if (!donacion) {
      return handleHttpError(res, "ERROR_DONACION_NOT_FOUND", 404);
    }

    // Actualizar la donación
    const [donacionActualizada, updatedDonacion] = await donacionModel.update(
      { entidad: entidad === "" ? null : entidad, mailEnviado },
      { where: { fecha: formattedFecha, mail }, returning: true }
    );

    // Actualizar el donante
    const [donanteActualizado, updatedDonante] = await donanteModel.update(
      { telefono, nombre, apellido },
      { where: { mail }, returning: true }
    );

    // Verificar si la actualización fue exitosa
    if (donacionActualizada === 0 || donanteActualizado === 0) {
      return handleHttpError(res, "ERROR_UPDATE_FAILED", 500);
    }

    const donacionJson = await donacionModel.findWithDonante(formattedFecha);

    // Devolver los datos actualizados
    res.status(200).json({
      message: "Donación actualizada con éxito",
      data: donacionJson,
    });
  } catch (error) {
    console.log("Error, no se pudo actualizar la donación");
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