/**
 * Archivo que se utiliza para las validaciones de autentificación del usuario
 */

const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

//Array de validaciones para el registro de usuario
const validatorRegister = [
  check("nombreUsuario")
    .exists()
    .withMessage("El campo nombre de usuario debe existir")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .isString()
    .isLength({ max: 255 })
    .withMessage("El nombre de usuario no debe contener más de 255 caracteres"),
  check("email")
    .exists()
    .withMessage("El campo email debe existir")
    .notEmpty()
    .withMessage("El campo email es obligatorio")
    .isEmail()
    .withMessage("Formato email incorrecto")
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage("El email no debe contener más de 255 caracteres"),
  check("password")
    .exists()
    .withMessage("El campo password debe existir")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isString()
    .isLength({ max: 255 })
    .withMessage("La contraseña no debe contener más de 50 caracteres"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

//Array de validaciones para el login de usuario
const validatorLogin = [
  check("email")
    .exists()
    .withMessage("El campo email debe existir")
    .notEmpty()
    .withMessage("El campo email es obligatorio")
    .isEmail()
    .withMessage("Formato de email incorrecto")
    .normalizeEmail(),
  check("password")
    .exists()
    .withMessage("El campo password debe existir")
    .notEmpty()
    .withMessage("El campo password es obligatorio")
    .isString()
    .withMessage("El password debe ser un string"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorRegister, validatorLogin };
