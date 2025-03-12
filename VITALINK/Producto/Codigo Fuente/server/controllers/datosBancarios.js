const { datosBancariosModel } = require("../models");
const handleHttpError = require("../utils/handleError");

const getAllDatosBancarios = async (req, res) => {
  try {
    const datosBancarios = await datosBancariosModel.findOne({
      order: [["id", "DESC"]], // Ordena los registros por 'id' de forma descendente
    });
    if (!datosBancarios) {
      return handleHttpError(res, "ERROR_DATOS_BANCARIOS_NOT_FOUND", 404);
    }

    res.status(200).json(datosBancarios);
  } catch (error) {
    console.log(
      "No se pudo obtener datos bancarios: ",
      error
    );
    handleHttpError(res, "ERROR_GET_ALL_DATOS_BANCARIOS", 500);
  }
};

const updateDatosBancarios = async (req, res) => {
  const { body } = req;
  try {
    const datosBancarios = await datosBancariosModel.findOne({
      order: [["id", "DESC"]],
    });

    if (!datosBancarios) {
      return handleHttpError(res, "ERROR_DATOS_BANCARIOS_NOT_FOUND", 404);
    }

    const datosBancariosActualizados = {
      titular: body.titular,
      alias: body.alias,
      cbu: body.cbu,
      qr: body.qrSrc,
      mp: body.linkMercadoPago,
      banco: body.banco,
    };

    await datosBancarios.update(datosBancariosActualizados);

    res.status(200).json({
      message: "Datos bancarios actualizados correctamente",
      data: datosBancarios,
    });
  } catch (error) {
    console.log("No se pudo actualizar los datos bancarios", error);
    handleHttpError(res, "ERROR_PUT_DATOS_BANCARIOS", 500);
  }
};



module.exports = { getAllDatosBancarios, updateDatosBancarios };