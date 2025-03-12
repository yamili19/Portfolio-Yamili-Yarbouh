/**
 * Middleware que se utilizara para autenticar al usuario
 */

const { usuarioModel } = require("../models");
const handleHttpError = require("../utils/handleError");
const { verifyToken } = require("../utils/handleToken");

const checkAuth = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return handleHttpError(res, "ERROR_NOT_AUTH_HEADER", 401);
    }
    const token = authorizationHeader.split(" ").pop();
    if (!token) {
      return handleHttpError(res, "ERROR_NOT_TOKEN_PROVIDER", 401);
    }

    //Si existe el token se válida el mismo
    const tokenData = await verifyToken(token);
    if (!tokenData) {
      return handleHttpError(res, "INVALID_TOKEN", 401);
    }
    console.log("Payload token: ", tokenData);

    if (tokenData.email) {
      const user = await usuarioModel.findByPk(tokenData.email);
      if (!user) {
        return handleHttpError(res, "ERROR_USER_NOT_FOUND", 404);
      }
      req.user = user;
      next();
    } else {
      return handleHttpError(res, "ERROR_NOT_UNAUTHORIZED", 401);
    }
  } catch (error) {
    console.log("Error al intentar la autenticacipon del usuario: ", error);
    handleHttpError(res, "ERROR_CHECK_AUTH", 500);
  }
};

module.exports = { checkAuth };
