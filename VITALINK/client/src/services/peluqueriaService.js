import axios from "axios";

const urlBasePeluquerias = "http://localhost:8000/api/peluquerias/";

const fetchPeluquerias = async () => {
  try {
    const res = await axios.get(urlBasePeluquerias);
    return res.data;
  } catch (error) {
    console.log("ERROR, no se pudo obtener las peluquerías: ", error);
    throw new Error("Error fetching peluquerías");
  }
};

const fetchPeluqueriasByName = async (name) => {
  try {
    const res = await axios.get(urlBasePeluquerias + name);
    return res.data;
  } catch (error) {
    console.log("ERROR, no se pudo obtener la peluquería: ", error);
    throw new Error("Error fetching peluquerías por nombre");
  }
};

const createPeluqueria = async (peluqueria) => {
  try {
    const res = await axios.post(urlBasePeluquerias, peluqueria);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo crear una nueva peluqueria: ", error);
    throw new Error("Error al crear la peluquería");
  }
};

const updatePeluqueria = async (nombre, peluqueria) => {
  try {
    const res = await axios.put(urlBasePeluquerias + nombre, peluqueria);
    return res.data;
  } catch (error) {
    console.log("ERROR, al intentar actualizar la peluquería: ", error);
    throw new Error("Error al actualizar la peluquería");
  }
};

const deletePeluqueria = async (nombre) => {
  try {
    await axios.delete(urlBasePeluquerias + nombre);
  } catch (error) {
    console.log("ERROR, al intentar eliminar la peluquería: ", error);
    throw new Error("Error al eliminar la peluquería");
  }
};

export default {
  fetchPeluquerias,
  fetchPeluqueriasByName,
  createPeluqueria,
  updatePeluqueria,
  deletePeluqueria,
};
