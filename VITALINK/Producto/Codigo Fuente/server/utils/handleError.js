/**
 * Función para manejar los errores del protocolo http
 * @param {*} res
 * @param {*} message
 * @param {*} code
 */

const handleHttpError = (res, message, code = 403) => {
  res.status(code).send({ error: message });
};

module.exports = handleHttpError;
