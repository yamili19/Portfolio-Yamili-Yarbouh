const express = require("express");
const { getAllDonationsByMonth, getCantidadPelucasNoDevueltasPorAño, getResumenPrestamosPorAnios } = require("../controllers/reporte");
const { checkAuth } = require("../middleware/checkAuth");
const router = express.Router();

router.get("/donaciones-mensuales/:year", checkAuth, getAllDonationsByMonth);
router.get("/pelucas-no-devueltas/:year1/:year2", checkAuth, getCantidadPelucasNoDevueltasPorAño);
router.get("/prestamo-tiempo-promedio/:year1/:year2", checkAuth, getResumenPrestamosPorAnios);
module.exports = router;
