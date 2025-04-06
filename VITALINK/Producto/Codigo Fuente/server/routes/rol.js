/**
 * Archivo para definir las rutas para los roles de usuarios
 */

const express = require("express");
const { getAllRoles } = require("../controllers/rol");
const router = express.Router();

router.get("/", getAllRoles);

module.exports = router;
