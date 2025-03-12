const express = require("express");
const { getAllAfiliacion } = require("../controllers/afiliacion");
const router = express.Router();

router.get("/", getAllAfiliacion);

module.exports = router;
