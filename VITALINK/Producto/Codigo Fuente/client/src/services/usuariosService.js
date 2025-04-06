/**
 * Archivo que usa para consumir endpoints de usuarios
 */

import axios from "axios";
const urlBaseUsuarios = "http://localhost:8000/api/usuarios/";

/**
 * Función consumo de API para obtener los usuarios
 * @param {*} token Pasar el token del usuario de la sesión
 * @returns Retorna los usuarios del sistema
 */
export const fetchUsuarios = async (token) => {
  try {
    const res = await axios.get(urlBaseUsuarios, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (
      error.response &&
      error.response.status === 403 &&
      error.response.data.error === "ERROR_USER_UNAUTHORIZED"
    ) {
      console.log("Usuario no autorizado: ", error.response.data.error);
      throw new Error("ERROR_USER_UNAUTHORIZED");
    }
    console.log("Error al obtener el fetch de Usuarios: ", error);
    throw new Error("Error en el fetching de usuarios");
  }
};

/**
 * Función servicio consumo API para eliminar usuario
 * @param {*} token Pasar token del usuario en la sesión
 * @param {*} nombreUsuario Pasar el nombre de usuario a eliminar
 * @returns Retoran los datos del usuarios eliminado
 */
export const deleteUsuario = async (token, nombreUsuario) => {
  try {
    const res = await axios.delete(urlBaseUsuarios + nombreUsuario, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (
      error.response &&
      error.response.status === 403 &&
      error.response.data.error === "ERROR_USER_UNAUTHORIZED"
    ) {
      console.log("Usuario no autorizado: ", error.response.data.error);
      throw new Error("ERROR_USER_UNAUTHORIZED");
    }
    console.log("Error al intentar eliminar el usuario: ", error);
    throw new Error("Error al eliminar usuario");
  }
};

/**
 * Función para consumir API actualización rol del usuario
 * @param {*} token Pasar el token del usuario en sesión
 * @param {*} nombreUsuario Pasar el nombre del usuario a actualizar su rol
 * @param {*} rol Pasar el ID del rol
 * @returns Retorna los datos del usuario actualizado
 */
export const updateUserRol = async (token, nombreUsuario, rol) => {
  try {
    const res = await axios.patch(
      urlBaseUsuarios + nombreUsuario,
      {
        rol: Number(rol),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.data;
  } catch (error) {
    if (
      error.response &&
      error.response.status === 403 &&
      error.response.data.error === "ERROR_USER_UNAUTHORIZED"
    ) {
      console.log("Usuario no autorizado: ", error.response.data.error);
      throw new Error("ERROR_USER_UNAUTHORIZED");
    }
    console.log("Error al actualizar rol del usuario: ", error);
    throw new Error("Error al actualizar rol del usuario");
  }
};
