const express = require("express");
const { predicticTypeFace } = require("../controllers/prediccion");
const router = express.Router();

router.post("/", predicticTypeFace);

module.exports = router;
