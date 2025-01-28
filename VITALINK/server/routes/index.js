const express = require("express");
const router = express.Router();

router.use("/peluquerias", require("./peluqueria"));
router.use("/barrios", require("./barrio"));

module.exports = router;
