/**
 * Archivo que se encarga de consumir la API de reportes
 */

import axios from "axios";
const urlBaseReportes = "http://localhost:8000/api/reportes/";

/**
 * Servicio consumo API reporte donaciones por mes
 * @param {*} year - Pasar el año del cual se quiere generar el reporte
 * @param {*} token - Pasar el token para autenticar al usuario
 * @returns - Retorna datos de la cantidad de donaciones realizadas por mes
 */
export const fetchDonacionesPorMes = async (year, token) => {
  try {
    const res = await axios.get(
      urlBaseReportes + "donaciones-mensuales/" + year,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(
      "Error, al obtener el fetch de reportes donaciones por mes: ",
      error
    );
    throw new Error("Error en el fetching reporte donaciones por mes.");
  }
};

export const fetchPelucasNoDevueltasPorAño = async (year1, year2, token) => {
  try{
    const res = await axios.get(
      urlBaseReportes + "pelucas-no-devueltas/" + year1 + "/" + year2,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        }, 
      }
    );
    return res.data;
  } catch (error){
    console.log(
      "Error, al obtener el fetch de reportes cantidad de pelucas no devueltas por año: ",
      error
    ); 
    throw new error("Error en el fetching reporte cantidad de pelucas no devueltas por año.");
  }
}

export const fetchTiempoPromedioPrestamo = async (year1, year2, token) => {
  try{
    const res = await axios.get(
      urlBaseReportes + "/prestamo-tiempo-promedio/" + year1 + "/" + year2, 
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        }, 
      }
    );
    return res.data;
  } catch (error){
    console.log(
      "Error, al obtener el fetch de reportes tiempo promedio de prestamos: ",
      error
    ); 
    throw new error("Error en el fetching reporte tiempo promedio de prestamos.");
  }
}