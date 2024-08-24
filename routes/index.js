const express = require("express");

const router = express.Router();

// controller
const sa = require("../controllers/sa.controller");
const kamar = require("../controllers/kamar.controller");
const tamu = require("../controllers/tamu.controller");
const tipe_kamar = require("../controllers/tipekamar.controller");
const order = require("../controllers/order.controller");

// method

// -- sa
router.post("/admin/login", sa.sa_login);

// -- kamar
router.post("/admin/add-kamar", kamar.add_kamar);
router.get("/admin/kamar", kamar.get_all_kamar);
router.post("/admin/edit-kamar/:id", kamar.edit_kamar);
router.delete("/admin/kamar/:id", kamar.delete_kamar);
router.get("/admin/kamar/stats", kamar.get_kamar_stats);

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
router.post("/checkin/create", order.checkin_order);
router.post("/checkin/update/:id", order.update_order);
router.delete("/checkin/delete/:id", order.delete_order);

// -- checkout
router.get("/checkout/kamar", order.get_checkout_kamar);
router.get("/checkout/kamar/:id", order.get_order_detail);
router.post("/checkout/kamar/:id", order.checkout_kamar);

module.exports = { router };
