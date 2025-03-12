/**
 * Archivo para manejar las peticiones http del donante
 */

const express = require("express");
const { getAllDonantes, getDonanteByMail } = require("../controllers/donante");
const router = express.Router();

router.get("/", getAllDonantes);

router.get("/:mail", getDonanteByMail);

module.exports = router;
