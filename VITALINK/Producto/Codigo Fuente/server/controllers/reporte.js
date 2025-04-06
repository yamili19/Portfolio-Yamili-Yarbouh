/**
 * Archivo que se encarga del manejo de reportes
 */

const { donacionModel } = require("../models");
const handleHttpError = require("../utils/handleError");
const { prestamoModel } = require("../models")
const getAllDonationsByMonth = async (req, res) => {
  const { year } = req.params;
  try {
    const result = await donacionModel.getDonationsByMonth(year);
    res.status(200).json(result);
  } catch (error) {
    console.log(
      "Error al intentar obtener el reporte de donaciones por mes: ",
      error
    );
    handleHttpError(res, "ERROR_GET_REPORT_DONATION", 500);
  }
};

const getCantidadPelucasNoDevueltasPorAño = async (req, res) => {
  const { year1, year2 } = req.params; 
  try{
    const result = await prestamoModel.getCantidadPelucasNoDevueltasPorAño(year1, year2);
    res.status(200).json(result);
  }
  catch (error){
    console.log(
      "Error al intentar obtener el reporte de cantidad de pelucas no devueltas por año: ",
      error
    );
    handleHttpError(res, "ERROR_GET_REPORT_PRESTAMO", 500)
  }
};

const getResumenPrestamosPorAnios = async (req, res) => {
  const {year1, year2} = req.params;
  try{
    const result = await prestamoModel.obtenerResumenPrestamosPorAnios(year1, year2);
    res.status(200).json(result);
  }catch (error){
    console.log(
      "Error al intentar obtener el reporte de tiempo promedio de prestamos: ", error
    ); 
    handleHttpError(res, "ERROR_GET_REPORT_PRESTAMO", 500)
  }
};

module.exports = { getAllDonationsByMonth, getCantidadPelucasNoDevueltasPorAño, getResumenPrestamosPorAnios };
