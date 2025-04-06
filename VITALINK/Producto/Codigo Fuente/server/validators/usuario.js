/**
 * Archivo para validar los campos para actualizar datos del usuario
 */

const { check, query } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorUsuario = [
  check("rol")
    .exists()
    .withMessage("El campo rol debe existir")
    .notEmpty()
    .withMessage("El campo rol no debe estar vacío")
    .isNumeric()
    .withMessage("El campo rol debe ser númerico")
    .isInt({ min: 1, max: 4 })
    .withMessage(
      "El valor del rol debe estar comprendido entre 1 y 4 inclusive"
    ),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

//Validaciones para las querys del buscador de usuarios
const validatorSearchUsuario = [
  query("nombreUsuario")
    .optional()
    .isLength({ max: 255 })
    .withMessage("El nombre de usuario no debe tener más de 255 caracteres"),
  query("email")
    .optional()
    .isLength({ max: 255 })
    .withMessage("El email no debe tener más de 255 caracteres"),
  query("rol")
    .optional()
    .isNumeric()
    .withMessage("La query rol debe ser númerica")
    .isInt({ min: 1, max: 4 })
    .withMessage(
      "El número de rol debe estar comprendido entre 1 y 4 inclusive"
    ),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

//Validaciones para la actualización de la contraseña del usuario
const validatorPasswordUsuario = [
  check("password")
    .exists()
    .withMessage("El campo password debe existir")
    .notEmpty()
    .withMessage("El campo password no debe estar vacío")
    .isString()
    .withMessage("El campo password debe ser un string")
    .isLength({ max: 255 })
    .withMessage("El campo password no debe tener más de 255 caracteres"),
  check("passwordConfirm")
    .exists()
    .withMessage("El campo passwordConfirm debe existir")
    .notEmpty()
    .withMessage("El campo passwordConfirm no debe estar vacío")
    .isString()
    .withMessage("El campo passwordConfirm debe ser un string")
    .isLength({ max: 255 })
    .withMessage(
      "El campo passwordConfirm no debe tener más de 255 caracteres"
    ),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

//Validaciones para actualizar la contraseña del usuario logueado
const validatorPasswordUsuarioAuth = [
  check("passwordActual")
    .exists()
    .withMessage("El campo passwordActual debe existir")
    .notEmpty()
    .withMessage("El campo passwordActual no debe estar vacío")
    .isString()
    .withMessage("El campo passwordActual debe ser un string")
    .isLength({ max: 255 })
    .withMessage("El campo passwordActual no debe tener más de 255 caracteres"),
  check("nuevaPassword")
    .exists()
    .withMessage("El campo nuevaPassword debe existir")
    .notEmpty()
    .withMessage("El campo nuevaPassword no debe estar vacío")
    .isString()
    .withMessage("El campo nuevaPassword debe ser un string")
    .isLength({ max: 255 })
    .withMessage("El campo nuevaPassword no debe tener más de 255 caracteres"),
  check("confirmarPassword")
    .exists()
    .withMessage("El campo confirmarPassword debe existir")
    .notEmpty()
    .withMessage("El campo confirmarPassword no debe estar vacío")
    .isString()
    .withMessage("El campo confirmarPassword debe ser un string")
    .isLength({ max: 255 })
    .withMessage(
      "El campo confirmarPassword no debe tener más de 255 caracteres"
    ),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorProfileUsuario = [
  check("nuevoNombreUsuario")
    .optional()
    //.withMessage("El campo nuevoNombreUsuario es opcional")
    .notEmpty()
    .withMessage("El campo nuevoNombreUsuario de existir, no debe estar vacío")
    .isString()
    .withMessage("El campo nuevoNombreUsuario debe ser un string")
    .isLength({ max: 255 })
    .withMessage(
      "El campo nuevoNombreUsuario no debe tener más de 255 caracteres"
    ),
  check("nuevoEmail")
    .optional()
    //.withMessage("El campo nuevoEmail es opcional")
    .notEmpty()
    .withMessage("El campo nuevoEmail de existir, no debe estar vacío")
    .isEmail()
    .withMessage("El campo nuevoEmail debe ser en formato de email")
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage("El campo nuevoEmail no debe tener más de 255 caracteres"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  validatorUsuario,
  validatorSearchUsuario,
  validatorPasswordUsuario,
  validatorPasswordUsuarioAuth,
  validatorProfileUsuario,
};
