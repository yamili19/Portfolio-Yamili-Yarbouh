const express = require("express");
const { getAllDatosBancarios, updateDatosBancarios } = require("../controllers/datosBancarios");
const router = express.Router();

router.get("/", getAllDatosBancarios);
router.put("/", updateDatosBancarios);

module.exports = router;