import axios from "axios";
const urlBaseEstadoPrestamo = "http://localhost:8000/api/estadoPrestamo/";

export const fetchEstadoPrestamo = async () => {
  try {
    const res = await axios.get(urlBaseEstadoPrestamo);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo obtener los estados del préstamo: ", error);
    throw new Error("Error en el feetching de estados de préstamos");
  }
};
