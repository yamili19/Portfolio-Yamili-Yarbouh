const express = require("express");
const { getAllEstadoPrestamo } = require("../controllers/estadoPrestamo");
const router = express.Router();

router.get("/", getAllEstadoPrestamo);

module.exports = router;
