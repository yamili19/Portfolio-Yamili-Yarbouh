const express = require("express");
const { getAllEstadoPeluca } = require("../controllers/estadoPeluca");
const router = express.Router();

router.get("/", getAllEstadoPeluca);

module.exports = router;
