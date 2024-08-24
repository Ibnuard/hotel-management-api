const express = require("express");

const router = express.Router();

// controller
const sa = require("../controllers/sa.controller");
const kamar = require("../controllers/kamar.controller");
const tamu = require("../controllers/tamu.controller");
const tipe_kamar = require("../controllers/tipekamar.controller");

// method

// -- sa
router.post("/admin/login", sa.sa_login);

// -- kamar
router.post("/admin/add-kamar", kamar.add_kamar);
router.get("/admin/kamar", kamar.get_all_kamar);
router.post("/admin/edit-kamar/:id", kamar.edit_kamar);
router.delete("/admin/kamar/:id", kamar.delete_kamar);

// -- tamu
router.post("/admin/add-tamu", tamu.add_tamu);
router.get("/admin/tamu", tamu.get_all_tamu);
router.post("/admin/edit-tamu/:id", tamu.edit_tamu);
router.delete("/admin/tamu/:id", tamu.delete_tamu);

// -- tipe kamar
router.post("/admin/add-tipe-kamar", tipe_kamar.add_tipe_kamar);
router.get("/admin/tipe", tipe_kamar.get_all_tipe);
router.post("/admin/edit-tipe-kamar/:id", tipe_kamar.edit_tipe_kamar);
router.delete("/admin/tipe/:id", tipe_kamar.delete_tipe_kamar);

// -- checkin
router.get("/checkin/kamar", kamar.get_ready_kamar);

module.exports = { router };
