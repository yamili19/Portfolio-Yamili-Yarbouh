const express = require("express");
const { getAllTipoPelo } = require("../controllers/tipoPelo");
const router = express.Router();

router.get("/", getAllTipoPelo);

module.exports = router;
