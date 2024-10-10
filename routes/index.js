const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer();

// controller
const sa = require("../controllers/sa.controller");
const kamar = require("../controllers/kamar.controller");
const tamu = require("../controllers/tamu.controller");
const tipe_kamar = require("../controllers/tipekamar.controller");
const order = require("../controllers/order.controller");
const product = require("../controllers/product.controller");
const paket = require("../controllers/paket.controller");
const aula = require("../controllers/aula.controller");

// method

// -- sa
router.post("/admin/login", sa.sa_login);
router.get("/admin/data", sa.get_sa);
router.post("/admin/update", sa.update_sa);

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

// -- order
router.get("/order/history", order.get_history);
router.get("/order/checkout-today", order.get_in_house);
router.post("/order/add-service/:id", order.add_product_service);

// -- admin product
router.post("/admin/product", product.add);
router.post("/admin/product/:id", product.edit);
router.get("/admin/product", product.get_all);
router.delete("/admin/product/:id", product.delete);

// -- paket aula
router.post("/aula/paket", paket.add);
router.post("/aula/paket/:id", paket.edit);
router.get("/aula/paket", paket.get_all);
router.delete("/aula/paket/:id", paket.delete);

// -- aula
router.post("/aula/sewa", aula.create_sewa);
router.post("/aula/sewa/:id", aula.edit_sewa);
router.get("/aula/sewa", aula.get_sewa);
router.delete("/aula/sewa/:id", aula.delete_sewa);
router.post("/aula/check", aula.check_sewa);

// -- inv
router.post(
  "/order/invoice/send",
  upload.single("invoice"),
  order.send_invoice_to_email
);

module.exports = { router };
