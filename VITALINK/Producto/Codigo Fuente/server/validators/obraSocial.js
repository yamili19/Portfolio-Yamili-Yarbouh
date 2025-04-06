/**
 * Archivo que se usa para hacer las validaciones para el registro y actualización de una obra social
 */

const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorObraSocial = [
  check("nombre")
    .exists()
    .withMessage("El campo nombre de obra social debe existir")
    .notEmpty()
    .withMessage("El campo del nombre de la obra social es obligatorio")
    .isString()
    .withMessage("El campo nombre de la obra social debe ser un String")
    .isLength({ max: 50 })
    .withMessage(
      "El nombre de la obra social no debe tener más de 50 caracteres"
    ),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = validatorObraSocial;
