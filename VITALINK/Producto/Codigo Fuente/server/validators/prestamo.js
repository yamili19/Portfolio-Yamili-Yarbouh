/**
 * Archivo que se usa para definir las validaciones para el registro y actualización del préstamo
 */

const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorRegisterPrestamo = [
  check("dni")
    .exists()
    .withMessage("El dni debe existir")
    .notEmpty()
    .withMessage("El dni es obligatorio")
    .isNumeric()
    .withMessage("El dni debe ser númerico")
    .isLength({ max: 11 })
    .withMessage("El dni no debe contener más de 11 caracteres"),
  check("nombre")
    .exists()
    .withMessage("El campo nombre debe existir")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe ser un string")
    .isLength({ max: 50 })
    .withMessage("El nombre no debe tener más de 50 caracteres"),
  check("apellido")
    .exists()
    .withMessage("El campo apellido debe existir")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isString()
    .withMessage("El apellido debe ser un string")
    .isLength({ max: 50 })
    .withMessage("El apellido no debe contener más de 50 caracteres"),
  check("nroTelefono")
    .exists()
    .withMessage("El campor nroTelefono debe existir")
    .notEmpty()
    .withMessage("El número de telefono es obligatorio")
    .isNumeric()
    .withMessage("El número de telefono debe ser númerico")
    .isLength({ max: 15 })
    .withMessage("El número de telefono no debe contener más de 15 digitos"),
  check("ciudad")
    .exists()
    .withMessage("El campo ciudad debe existir")
    .notEmpty()
    .withMessage("La ciudad es obligatorio")
    .isNumeric()
    .withMessage("La ciudad debe ser númerica")
    .isLength({ max: 11 })
    .withMessage("La ciudad no debe contener más de 11 digitos"),
  check("usuario")
    .optional()
    .normalizeEmail()
    .isLength({ max: 50 })
    .withMessage("El usuario no debe tener más de 50 caracteres"),
  check("codigoPeluca")
    .exists()
    .withMessage("El campo codigoPeluca debe existir")
    .notEmpty()
    .withMessage("El codigo peluca es obligatorio")
    .isNumeric()
    .withMessage("El codigo peluca debe ser númerico")
    .isLength({ max: 11 })
    .withMessage("El codigo peluca no debe tener más de 11 caracteres"),
  check("vinculo")
    .exists()
    .withMessage("El campo vinculo debe existir")
    .notEmpty()
    .withMessage("El vinculo no debe ser vacío")
    .isNumeric()
    .withMessage("El vinculo debe ser númerico")
    .isLength({ max: 11 })
    .withMessage("El vinculo no debe tener más de 11 digitos"),
  check("obraSocial")
    .optional()
    .isLength({ max: 11 })
    .withMessage("La obra social no debe contener más de 11 caracteres"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorUpdatePrestamo = [
  check("nombre")
    .exists()
    .withMessage("El campo nombre debe existir")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe ser un string")
    .isLength({ max: 50 })
    .withMessage("El nombre no debe tener más de 50 caracteres"),
  check("apellido")
    .exists()
    .withMessage("El campo apellido debe existir")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isString()
    .withMessage("El apellido debe ser un string")
    .isLength({ max: 50 })
    .withMessage("El apellido no debe contener más de 50 caracteres"),
  check("nroTelefono")
    .exists()
    .withMessage("El campor nroTelefono debe existir")
    .notEmpty()
    .withMessage("El número de telefono es obligatorio")
    .isNumeric()
    .withMessage("El número de telefono debe ser númerico")
    .isLength({ max: 15 })
    .withMessage("El número de telefono no debe contener más de 15 digitos"),
  check("ciudad")
    .exists()
    .withMessage("El campo ciudad debe existir")
    .notEmpty()
    .withMessage("La ciudad es obligatorio")
    .isNumeric()
    .withMessage("La ciudad debe ser númerica")
    .isLength({ max: 11 })
    .withMessage("La ciudad no debe contener más de 11 digitos"),
  check("usuario")
    .optional()
    .normalizeEmail()
    .isLength({ max: 50 })
    .withMessage("El usuario no debe tener más de 50 caracteres"),
  check("codigoPeluca")
    .exists()
    .withMessage("El campo codigoPeluca debe existir")
    .notEmpty()
    .withMessage("El codigo peluca es obligatorio")
    .isNumeric()
    .withMessage("El codigo peluca debe ser númerico")
    .isLength({ max: 11 })
    .withMessage("El codigo peluca no debe tener más de 11 caracteres"),
  check("vinculo")
    .exists()
    .withMessage("El campo vinculo debe existir")
    .notEmpty()
    .withMessage("El vinculo no debe ser vacío")
    .isNumeric()
    .withMessage("El vinculo debe ser númerico")
    .isLength({ max: 11 })
    .withMessage("El vinculo no debe tener más de 11 digitos"),
  check("obraSocial")
    .optional()
    .isLength({ max: 11 })
    .withMessage("La obra social no debe contener más de 11 caracteres"),
  check("fechaDevolucion")
    .exists()
    .withMessage("El campo fechaDevolucion debe existir")
    .notEmpty()
    .withMessage("La fecha de devolución es obligatorio")
    .isDate()
    .withMessage(
      "La fecha de devolución debe tener formato de fecha AAAA/MM/DD"
    ),
  check("estadoPrestamo")
    .exists()
    .withMessage("El campo estadoPrestamo debe existir")
    .notEmpty()
    .withMessage("El estado del prestamo es obligatorio")
    .isNumeric()
    .withMessage("El estado del préstamo es un campo númerico")
    .isLength({ max: 11 })
    .withMessage("El estado del préstamo no puede contener más de 11 digitos"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorUpdateRenovarPrestamo = [
  check("fechaDevolucion")
    .exists()
    .withMessage("El campo fechaDevolucion debe existir")
    .notEmpty()
    .withMessage("La fecha de devolución es obligatorio")
    .isDate()
    .withMessage(
      "La fecha de devolución debe tener formato de fecha AAAA/MM/DD"
    ),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  validatorRegisterPrestamo,
  validatorUpdatePrestamo,
  validatorUpdateRenovarPrestamo,
};
