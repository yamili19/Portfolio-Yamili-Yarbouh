/**
 * Archivo que se utiliza para las validaciones del pedido de pelucas
 */

const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

//Array de validaciones para el registro del pedido de pelucas

const validatorCreatePedidoPeluca = [
  check("fechaPedido")
    .exists()
    .withMessage("La fecha del pedido debe existir")
    .notEmpty()
    .withMessage("La fecha del pedido es obligatorio")
    .isString()
    .withMessage("La fecha del pedido debe ser un string")
    .isLength({ max: 50 })
    .withMessage("La fecha del pedido no debe superar los 50 caracteres"),
  check("cantCabello")
    .exists()
    .withMessage("El campo cantidad de cabello debe existir")
    .notEmpty()
    .withMessage("El campo cantidad de cabello es obligatorio")
    .isNumeric()
    .withMessage("La cantidad de cabello debe ser númerico")
    .isInt({ min: 1 })
    .withMessage("El campo cantidad de cabello debe ser un valor positivo"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

//Array de validaciones para las actualizaciones del registro de pedido de peluca

const validatorUpdatePedidoPeluca = [
  check("fechaPedido")
    .exists()
    .withMessage("La fecha del pedido debe existir")
    .notEmpty()
    .withMessage("La fecha del pedido es obligatorio")
    .isString()
    .withMessage("La fecha del pedido debe ser un string")
    .isLength({ max: 50 })
    .withMessage("La fecha del pedido no debe superar los 50 caracteres"),
  check("cantCabello")
    .exists()
    .withMessage("El campo cantidad de cabello debe existir")
    .notEmpty()
    .withMessage("El campo cantidad de cabello es obligatorio")
    .isNumeric()
    .withMessage("La cantidad de cabello debe ser númerico")
    .isInt({ min: 1 })
    .withMessage("El campo cantidad de cabello debe ser un valor positivo"),
  //check("cantPelucasLlegaron")
  //.exists()
  //.withMessage("El campo cantidad de cabello llegado debe existir")
  //.optional()
  //.isNumeric()
  //.withMessage("El campo cantidad de cabello llegado debe ser númerico")
  //.isInt({ min: 1 })
  //.withMessage(
  //"El campo cantidad de cabello llegado debe ser un valor positivo"
  //)
  //.isLength({ max: 11 })
  //.withMessage("La cantidad llegada no debe superar los 11 digítos"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreatePedidoPeluca, validatorUpdatePedidoPeluca };
