const express = require("express");
const getAllBarrios = require("../controllers/barrio");
const router = express.Router();

router.get("/", getAllBarrios);

module.exports = router;
