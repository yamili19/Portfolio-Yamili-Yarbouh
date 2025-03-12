/**
 * Archivo que se utiliza para crear y verificar un token de sesión de usuario
 */

const jwt = require("jsonwebtoken");
require("dotenv").config();
const llaveMaestra = process.env.JWT_SECRET;

//Función para generar un token firmado

/**
 * Pasar el usuario para generarle y firmarle un token de sesión
 * @param {*} user
 * @returns
 * Retorna el token de sesión firmado
 */
const tokenSing = async (user) => {
  try {
    const token = jwt.sign(
      {
        nombreUsuario: user.nombreUsuario,
        email: user.email,
        rol: user.rol,
      },
      llaveMaestra,
      {
        expiresIn: "4h",
      }
    );

    return token;
  } catch (error) {
    console.log("Error al generar el token: ", error);
    throw new Error("Error al general el token");
  }
};

/**
 * Verifica la validez del token
 * @param {*} token - Pasar el Token a válidar
 * @returns {object|null} Retorna los datos decodificados del token o null si no es válido
 */
const verifyToken = async (token) => {
  try {
    return jwt.verify(token, llaveMaestra);
  } catch (error) {
    console.log("Error al válidar token: ", error);
    throw new Error("Token inválido o expirado");
  }
};

module.exports = { tokenSing, verifyToken };
