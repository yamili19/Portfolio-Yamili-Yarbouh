/**
 * Archivo que maneja las peticiones http para las donaciones
 */

const express = require("express");
const {
  getAllDonaciones,
  createDonacion,
  deleteDonacion,
  getDonacionByFecha,
  updateDonacion,
} = require("../controllers/donacion");
const {
  validatorDonacion,
  validatorUpdateDonacion,
} = require("../validators/donacion");
const router = express.Router();

//TODO: localhost/api/donaciones
router.get("/", getAllDonaciones);

//TODO: /api/donaciones/:fecha
router.get("/:fecha", getDonacionByFecha);

//Transacción de registro de donación de cabello
//RECORDATORIO: Agregar el middleware de que solo el peluquero o la responable del sistema
//puede llevar a cabo esta acción
//TODO /api/donaciones/
router.post("/", validatorDonacion, createDonacion);

//TODO: /api/donaciones/:fecha
router.put("/:fecha", validatorUpdateDonacion, updateDonacion);

router.delete("/:fecha", deleteDonacion);

module.exports = router;
