const express = require("express");

const router = express.Router();

// controller
const sa = require("../controllers/sa.controller");

// method

// -- sa
router.post("/admin/login", sa.sa_login);

module.exports = { router };
