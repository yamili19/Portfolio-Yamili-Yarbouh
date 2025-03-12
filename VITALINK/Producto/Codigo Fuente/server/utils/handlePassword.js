/**
 * Archivo que se usa para la encriptación y comparación de contraseñas de usuarios
 */

const bcrypt = require("bcryptjs");
const saltRounds = 10;
//Función para encriptar las contraseñas de los usuarios

/**
 * Pasar la contraseña en texto plano
 * @param {*} passwordPlain
 * @returns
 * Retorno la contraseña encriptada
 */
const encrypt = async (passwordPlain) => {
  const hash = await bcrypt.hash(passwordPlain, saltRounds);
  return hash;
};

//Función que se utiliza para comparar las contraseñas

/**
 * Pasar la contraseña en texto plano y la contraseña encriptada
 * @param {*} passwordPlain
 * @param {*} hashPassword
 * @returns
 */
const compare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};

module.exports = { encrypt, compare };
