/**
 * Archivo que se usa para definir las rutas mediante peticiones http para los préstamos
 */

const express = require("express");
const {
  getAllPrestamo,
  getPrestamoByNro,
  createPrestamo,
  deletePrestamo,
  updatePrestamo,
  updateRenovarPrestamo,
  getResumenPrestamo,
} = require("../controllers/prestamo");
const {
  validatorRegisterPrestamo,
  validatorUpdatePrestamo,
  validatorUpdateRenovarPrestamo,
} = require("../validators/prestamo");
const router = express.Router();

/**
 * RECORDARTORIO, agregar los permisos de acuerdo al rol del usuario
 */

//TODO: /api/prestamos/
router.get("/", getAllPrestamo);

//TODO: /api/prestamos/nroPrestamo
router.get("/:nroPrestamo", getPrestamoByNro);

//TODO: /api/prestamos/
router.post("/", validatorRegisterPrestamo, createPrestamo);

//TODO: /api/prestamos/nroPrestamo
router.put("/:nroPrestamo", validatorUpdatePrestamo, updatePrestamo);

//TODO: /api/prestamos/renovar/nroPrestamo
router.put(
  "/renovar/:nroPrestamo",
  validatorUpdateRenovarPrestamo,
  updateRenovarPrestamo
);

//TODO: /api/prestamos/nroPrestamo
router.delete("/:nroPrestamo", deletePrestamo);

//TODO: /api/prestamos/estadistico/resumenPrestamo
router.get("/estadistico/resumenPrestamo", getResumenPrestamo);

module.exports = router;
