const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

//Reglas para validar o actualizar una peluquería
const validatorPeluqueria = [
  check("nombre")
    .exists()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString(),
  check("contacto")
    .exists()
    .notEmpty()
    .withMessage("El contacto es obligatoria")
    .isString(),
  check("calle")
    .exists()
    .notEmpty()
    .withMessage("La calle es obligatoria")
    .isString(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorPeluqueria };
