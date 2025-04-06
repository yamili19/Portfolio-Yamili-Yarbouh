const { estadoPrestamoModel } = require("../models");
const handleHttpError = require("../utils/handleError");

const getAllEstadoPrestamo = async (req, res) => {
  try {
    const estadosPrestamo = await estadoPrestamoModel.findAll({});
    res.status(200).json(estadosPrestamo);
  } catch (error) {
    console.log("Error, no se pudo obtener los estados de prestamos: ", error);
    handleHttpError(res, "ERROR_GET_ALL_ESTADO_PRESTAMO", 500);
  }
};

module.exports = { getAllEstadoPrestamo };
