const express = require("express");
const { getAllCiudad } = require("../controllers/ciudad");
const router = express.Router();

router.get("/", getAllCiudad);

module.exports = router;
