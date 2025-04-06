/**
 * Archivo que se utiliza para el manejor de métodos POST para la autenticación de usuarios (Register y Login)
 */

const express = require("express");
const { registerCtrl, loginCtrl } = require("../controllers/auth");
const { validatorRegister, validatorLogin } = require("../validators/auth");
const router = express.Router();

//TODO: /api/auth/register
router.post("/register", validatorRegister, registerCtrl);

//TODO /api/auth/login
router.post("/login", validatorLogin, loginCtrl);

module.exports = router;
