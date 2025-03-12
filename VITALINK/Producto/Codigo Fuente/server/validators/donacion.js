/**
 * Archivo que se utiliza para realizar las validaciones al registrar una donación
 */

const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

//Reglas
const validatorDonacion = [
  /*
  check("fecha")
    .notEmpty()
    .withMessage("La fecha del registro de la donación es obligatorio"),
    */
  check("mail")
    .exists()
    .notEmpty()
    .withMessage("El email del donante es obligatorio")
    .isEmail()
    .withMessage("Formato de email es incorrecto")
    .normalizeEmail()
    .isLength({ max: 50 })
    .withMessage("El email no puede contener más de 50 caracteres"),
  check("entidad")
    .exists()
    .isLength({ max: 50 })
    .withMessage("La peluquería no puede contener más de 50 caracteres"),
  check("telefono")
    .exists()
    .notEmpty()
    .withMessage("El telefono del donante es obligatorio")
    .isString()
    .withMessage("El campo telefono debe ser un string")
    .isLength({ max: 50 })
    .withMessage("El telefono no debe tener más de 50 caracteres"),
  check("nombre")
    .exists()
    .notEmpty()
    .withMessage("El nombre del donante es obligatorio")
    .isString()
    .isLength({ max: 50 })
    .withMessage("El nombre del donante no puede tener más de 50 caracteres"),
  check("apellido")
    .exists()
    .notEmpty()
    .withMessage("El apellido del donante es obligatorio")
    .isString()
    .isLength({ max: 50 })
    .withMessage(
      "El apellido del donante no puede tener más del 50 caracteres"
    ),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

//Array de validaciones para actualizar una donación
const validatorUpdateDonacion = [
  check("mail")
    .exists()
    .withMessage("El campo mail debe existir")
    .notEmpty()
    .withMessage("Este campo es obligatorio")
    .isEmail()
    .withMessage("Formato de email incorrecto")
    .normalizeEmail()
    .isLength({ max: 55 })
    .withMessage("El campo mail no debe superar los 50 caracteres"),
  check("entidad")
    .exists()
    .withMessage("El campo entidad debe existir")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("La entidad debe ser un string")
    .isLength({ max: 50 })
    .withMessage("La entidad no debe superar los 50 caracteres"),
  check("mailEnviado")
    .exists()
    .withMessage("El campo mailEviado debe existir")
    .isBoolean()
    .withMessage("El camo mailEnviado debe ser booleano"),
  check("telefono")
    .exists()
    .withMessage("El campo telefono debe existir")
    .notEmpty()
    .withMessage("El telefono del donante es obligatorio")
    .isString()
    .withMessage("El campo telefono debe ser un string")
    .isLength({ max: 50 })
    .withMessage("El telefono no debe tener más de 50 caracteres"),
  check("nombre")
    .exists()
    .withMessage("El campo nombre debe existir")
    .notEmpty()
    .withMessage("El nombre del donante es obligatorio")
    .isString()
    .withMessage("El nombre debe ser un string")
    .isLength({ max: 50 })
    .withMessage("El nombre del donante no puede tener más de 50 caracteres"),
  check("apellido")
    .exists()
    .withMessage("El campo apellido debe seer un string")
    .notEmpty()
    .withMessage("El apellido del donante es obligatorio")
    .isString()
    .withMessage("El campo apellido debe ser un string")
    .isLength({ max: 50 })
    .withMessage(
      "El apellido del donante no puede tener más del 50 caracteres"
    ),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorDonacion, validatorUpdateDonacion };
