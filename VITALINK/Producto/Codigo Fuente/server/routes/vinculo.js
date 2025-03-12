const express = require("express");
const { getAllVinculo } = require("../controllers/vinculo");
const router = express.Router();

router.get("/", getAllVinculo);

module.exports = router;
