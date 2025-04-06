const express = require("express");
const { getAllTiposCara } = require("../controllers/tipoCara");
const router = express.Router();

router.get("/", getAllTiposCara);

module.exports = router;
