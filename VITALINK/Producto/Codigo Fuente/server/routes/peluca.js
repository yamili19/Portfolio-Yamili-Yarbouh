/**
 * Archivo para definir las peticiones HTTP para las pelucas
 */

const express = require("express");
const {
  getAllPelucas,
  getPelucaByCodigo,
  createPeluca,
  updatePeluca,
  deletePeluca,
  getAllPelucasWithPrestamo,
  getResumenPeluca,
  getAllPelucasWithPrestamoAndTypeFace,
} = require("../controllers/peluca");
const uploadMiddleware = require("../utils/handleStorage");
const validatorPeluca = require("../validators/peluca");
const router = express.Router();

/**
 * RECORDATORIO: AGREGAR EL TEMA DE LOS PERMISOS
 */

//TODO: /api/pelucas
router.get("/", getAllPelucas);

//TODO: /api/pelucas/disponible
router.get("/disponible", getAllPelucasWithPrestamo);

router.get("/disponible/tipoCara", getAllPelucasWithPrestamoAndTypeFace);

//TODO: /api/pelucas/:codigo
router.get("/:codigo", getPelucaByCodigo);

//TODO: /api/pelucas
router.post(
  "/",
  uploadMiddleware.single("fotoPeluca"),
  validatorPeluca,
  createPeluca
);

//TODO: /api/pelucas/:codigo
router.put(
  "/:codigo",
  uploadMiddleware.single("fotoPeluca"),
  validatorPeluca,
  updatePeluca
);

router.delete("/:codigo", deletePeluca);

//TODO: /api/pelucas/estadistico/resumenPeluca
router.get("/estadistico/resumenPeluca", getResumenPeluca);

module.exports = router;
