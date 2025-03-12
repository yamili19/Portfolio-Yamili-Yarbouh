const express = require("express");
const { getAllCliente, getClienteByDni } = require("../controllers/cliente");
const router = express.Router();

//TODO: /api/clientes
router.get("/", getAllCliente);

//TODO: /api/clientes/:dni
router.get("/:dni", getClienteByDni);

module.exports = router;
