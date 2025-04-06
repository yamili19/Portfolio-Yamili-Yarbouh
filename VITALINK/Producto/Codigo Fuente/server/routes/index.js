const express = require("express");
const router = express.Router();

router.use("/peluquerias", require("./peluqueria"));
router.use("/barrios", require("./barrio"));
router.use("/donaciones", require("./donacion"));
router.use("/donantes", require("./donante"));
router.use("/obras", require("./obraSocial"));
router.use("/auth", require("./auth"));
router.use("/pedidos", require("./pedidoPeluca"));
router.use("/pelucas", require("./peluca"));
router.use("/tipoPelo", require("./tipoPelo"));
router.use("/estadoPeluca", require("./estadoPeluca"));
router.use("/vinculos", require("./vinculo"));
router.use("/estadoPrestamo", require("./estadoPrestamo"));
router.use("/prestamos", require("./prestamo"));
router.use("/ciudades", require("./ciudad"));
router.use("/clientes", require("./cliente"));
router.use("/afiliaciones", require("./afiliacion"));
router.use("/tiposCara", require("./tipoCara"));
router.use("/prediccion", require("./prediccion"));
router.use("/reportes", require("./reporte"));
router.use("/listaEspera", require("./listaEspera"));
router.use("/datosBancarios", require("./datosBancarios"));
router.use("/usuarios", require("./usuario"));
router.use("/roles", require("./rol"));

module.exports = router;
