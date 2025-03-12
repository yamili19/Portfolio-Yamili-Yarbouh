import axios from "axios";

const urlBasePeluquerias = "http://localhost:8000/api/peluquerias/";

export const fetchPeluquerias = async () => {
  try {
    const res = await axios.get(urlBasePeluquerias);
    return res.data;
  } catch (error) {
    console.log("ERROR, no se pudo obtener las peluquerías: ", error);
    throw new Error("Error fetching peluquerías");
  }
};

export const fetchPeluqueriasByName = async (name) => {
  try {
    const res = await axios.get(urlBasePeluquerias + name);
    return res.data;
  } catch (error) {
    console.log("ERROR, no se pudo obtener la peluquería: ", error);
    throw new Error("Error fetching peluquerías por nombre");
  }
};

export const createPeluqueria = async (peluqueria) => {
  try {
    const res = await axios.post(urlBasePeluquerias, peluqueria);
    return res.data;
  } catch (error) {
    console.log("Error, no se pudo crear una nueva peluqueria: ", error);
    throw new Error("Error al crear la peluquería");
  }
};

export const updatePeluqueria = async (nombre, peluqueria) => {
  try {
    const res = await axios.put(urlBasePeluquerias + nombre, peluqueria);
    return res.data;
  } catch (error) {
    console.log("ERROR, al intentar actualizar la peluquería: ", error);
    throw new Error("Error al actualizar la peluquería");
  }
};

export const deletePeluqueria = async (nombre) => {
  try {
    await axios.delete(urlBasePeluquerias + nombre);
  } catch (error) {
    console.log("ERROR, al intentar eliminar la peluquería: ", error);
    throw new Error("Error al eliminar la peluquería");
  }
};
