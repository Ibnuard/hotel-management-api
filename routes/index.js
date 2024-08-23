const express = require("express");

const router = express.Router();

// controller
const sa = require("../controllers/sa.controller");
const kamar = require("../controllers/kamar.controller");

// method

// -- sa
router.post("/admin/login", sa.sa_login);
router.post("/admin/add-kamar", kamar.add_kamar);

module.exports = { router };
