/**
 * Archivo que se utiliza para manejar las peticiones http de obras sociales
 */

const express = require("express");
const {
  getAllObrasSociales,
  createObraSocial,
  getObraSocialById,
  updateObraSocial,
  deleteObraSocial,
} = require("../controllers/obraSocial");
const validatorObraSocial = require("../validators/obraSocial");
const router = express.Router();

/**
 * RECORDATORIO: agregar el middelware del rol que puede llevar a cabo las acciones
 */

//TODO: localhost/api/obras
router.get("/", getAllObrasSociales);

//TODO: localhost/api/obras/:id
router.get("/:id", getObraSocialById);

//TODO: localhost/api/obras
router.post("/", validatorObraSocial, createObraSocial);

//TODO: localhost/api/obras/:id
router.put("/:id", validatorObraSocial, updateObraSocial);

//TODO: localhost/api/obras/:id
router.delete("/:id", deleteObraSocial);

module.exports = router;
