const express = require("express");
const {
  getAllPeluquerias,
  createPeluqueria,
  updatePeluqueria,
  deletePeluqueria,
  getPeluqueriaByName,
} = require("../controllers/peluqueria");
const { validatorPeluqueria } = require("../validators/peluqueria");
const router = express.Router();

/**
 * RECORDATORIO
 * Agregar el middleware del rol que puede realizar tal accion
 * puede realizar cada accion
 */

router.get("/", getAllPeluquerias);

router.get("/:nombre", getPeluqueriaByName);

router.post("/", validatorPeluqueria, createPeluqueria);

router.put("/:nombre", validatorPeluqueria, updatePeluqueria);

router.delete("/:nombre", deletePeluqueria);

module.exports = router;
