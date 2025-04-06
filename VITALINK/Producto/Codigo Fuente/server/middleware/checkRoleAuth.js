/**
 * Archivo que se usa para controlar el acceso a los recursos de acuerdo al rol del Usuario
 */

const { usuarioModel } = require("../models");
const handleHttpError = require("../utils/handleError");
const { verifyToken } = require("../utils/handleToken");

/**
 * Función para validar el rol del usuario
 * @param {*} roles  Pasar el array de roles permitidos para acceder al recurso
 * @returns
 */
const checkRoleAuth = (roles) => async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);
    const userData = await usuarioModel.findOneUserWithRol(
      tokenData.nombreUsuario
    );

    if (userData.rol == null) {
      return handleHttpError(res, "ERROR_USER_UNAUTHORIZED", 403);
    }

    //Se verifica si el rol del usuario esta en el array de roles permitidos
    if (roles.includes(userData.Rol.nombre)) {
      next();
    } else {
      return handleHttpError(res, "ERROR_USER_UNAUTHORIZED", 403);
    }
  } catch (error) {
    console.log("Error al validar rol del usuario: ", error);
    handleHttpError(res, "ERROR_CHECK_ROLE_AUTH", 500);
  }
};

module.exports = checkRoleAuth;
