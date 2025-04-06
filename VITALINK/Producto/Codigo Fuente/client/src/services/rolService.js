/**
 * Archivo que se utiliza para consumir API de roles de usuarios
 */

import axios from "axios";

const urlBaseRoles = "http://localhost:8000/api/roles/";

export const fetchRoles = async () => {
  try {
    const res = await axios.get(urlBaseRoles);
    return res.data;
  } catch (error) {
    console.log("Error en el fetch de roles: ", error);
    throw new Error("Error en el fetching de roles");
  }
};
