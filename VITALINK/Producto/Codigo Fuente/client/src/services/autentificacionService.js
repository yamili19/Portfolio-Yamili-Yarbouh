/**
 * Archivo que se utiliza para consumir la API de registro y login de usuario
 */

import axios from "axios";

const urlBaseRegister = "http://localhost:8000/api/auth/register";
const urlBaseLogin = "http://localhost:8000/api/auth/login";

/**
 * Pasar el objeto usuario que se quiere registrar
 * @param {*} user
 * @returns
 * Retorna los datos del nuevo usuario registrado
 */
export const registerUser = async (user) => {
  try {
    const res = await axios.post(urlBaseRegister, user);
    return res.data;
  } catch (error) {
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.error === "ERROR_USER_EXIST"
    ) {
      console.log("Usuario ya existe: ", error.response.data.error);
      throw new Error("ERROR_USER_EXIST");
    }
    console.log("Error, no se pudo registrar el usuario: ", error);
    throw new Error("Error al registrar el usuario");
  }
};

/**
 * Pasar el objeto usuario que se quiere loguear
 * @param {*} user
 * @returns
 * Retorna los datos del usuario logueado
 */
export const loginUser = async (user) => {
  try {
    const res = await axios.post(urlBaseLogin, user);
    return res.data;
  } catch (error) {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.error === "ERROR_EMAIL_INVALID"
    ) {
      console.log("El email es invalido: ", error.response.data.error);
      throw new Error("ERROR_EMAIL_INVALID");
    } else if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.error === "ERROR_PASSWORD_INVALID"
    ) {
      console.log("La contraseña es invalida: ", error.response.data.error);
      throw new Error("ERROR_PASSWORD_INVALID");
    }
    console.log("Error, no se pudo loguear el usuario: ", error);
    throw new Error("Error al loguear el usuario");
  }
};
