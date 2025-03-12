/**
 * Archivo que se utiliza para definir las validaciones para el registro y actualización de una peluca
 */

const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

//Array de validaciones para las pelucas
const validatorPeluca = [
  check("talle")
    .exists()
    .withMessage("El campo talle debe existir")
    .notEmpty()
    .withMessage("El talle es obligatorio")
    .isString()
    .withMessage("El talle debe ser un string")
    .isLength({ max: 2 })
    .withMessage("El talle no debe tenes más de 2 caracteres"),
  check("color")
    .exists()
    .withMessage("El campo color debe existir")
    .notEmpty()
    .withMessage("El color es obligatorio")
    .isString()
    .withMessage("El color debe ser un string")
    .isLength({ max: 50 })
    .withMessage("El color no debe tener más de 50 caracteres"),
  check("tipoPelo")
    .exists()
    .withMessage("El campo tipoPelo debe existit")
    .notEmpty()
    .exists("El tipo de pelo es obligatorio")
    .isNumeric()
    .withMessage("El tipoPelo es númerico")
    .isLength({ max: 11 })
    .withMessage("El tipo de pelo no debe contener más de 11 caracteres"),
  check("fechaConfeccion")
    .exists()
    .withMessage("El campo fechaConfeccion debe existir")
    .notEmpty()
    .withMessage("La fecha de confeccion es obligatorio")
    .isDate()
    .withMessage("La fecha de confeccion debe ser una fecha"),
  check("estadoPeluca")
    .exists()
    .withMessage("El campo estadoPeluca debe existir")
    .notEmpty()
    .withMessage("El estado de la peluca es obligatorio")
    .isNumeric()
    .withMessage("El estado de la peluca es númerico")
    .isLength({ max: 11 })
    .withMessage("El estado de peluca no puede contener más de 11 caracteres"),
  //check("fotoPeluca").exists().withMessage("El campo fotoPeluca debe existir"),
  check("tieneApross")
    .exists()
    .withMessage("El campo tieneApross debe existir")
    .notEmpty()
    .withMessage("El campo tiene apross es obligatorio")
    .isBoolean()
    .withMessage("El tiene apross debe ser un valor booleano"),
  check("descripcion")
    .exists()
    .withMessage("El campo descripcion debe existir")
    .isString()
    .withMessage("El campo descripcion debe ser un string")
    .isLength({ max: 200 })
    .withMessage("La descripcion no debe contener más de 200 caracteres"),
  check("tiposCara")
    .exists()
    .withMessage("El campo tiposCara debe existir")
    .notEmpty()
    .withMessage("Este campo es obligatorio"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = validatorPeluca;
