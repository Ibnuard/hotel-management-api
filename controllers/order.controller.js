const { Op, col, where, Sequelize } = require("sequelize");
const db = require("../db");
const { ERROR_MESSAGE_GENERAL } = require("../utils/Constants");
const { Resp } = require("../utils/Resp");
const moment = require("moment");
const {
  extractNumberFromCurrency,
  calculateDateDifference,
} = require("../utils/Utils");
const order_db = db.order;
const kamar_db = db.kamar;
const tamu_db = db.tamu;
const tipe_kamar_db = db.tipe_kamar;

exports.checkin_order = async (req, res) => {
  const {
    tamu_id,
    jumlah_dewasa,
    jumlah_anak,
    jumlah_deposit,
    tgl_checkin,
    waktu_checkin,
    tgl_checkout,
    waktu_checkout,
    kamar_id,
  } = req.body;
  try {
    const currentDate = moment(new Date()).format("YYYYMMDD");
    const randomDigits = Math.floor(10000 + Math.random() * 90000); // Ensures it is a 5-digit number

    const INVOICE = `INV-AGRK2-${currentDate}-${randomDigits}`;

    await order_db.create({
      invoice_id: INVOICE,
      tamu_id,
      jumlah_dewasa,
      jumlah_anak,
      jumlah_deposit,
      tgl_checkin,
      waktu_checkin,
      tgl_checkout,
      waktu_checkout,
      kamar_id,
      status_order: "CHECKED_IN",
    });

    await kamar_db.update({ in_use: true }, { where: { id: kamar_id } });

    Resp(res, "OK", "Success!", { success: true });
    return;
  } catch (error) {
    console.log(error);
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};

exports.get_checkout_kamar = async (req, res) => {
  const { page = 1, limit = 10, cari } = req.query;

  try {
    const offset = (page - 1) * limit;

    // Build the where condition for a single search query
    // Build the where condition for a single search query
    const whereCondition = {
      status_order: "CHECKED_IN",
    };

    if (cari) {
      whereCondition[Op.or] = [
        { "$kamar.nama_kamar$": { [Op.like]: `%${cari}%` } },
        { "$kamar.nomor_kamar$": { [Op.like]: `%${cari}%` } },
        { "$tamu.nama_depan$": { [Op.like]: `%${cari}%` } },
        { "$tamu.nama_belakang$": { [Op.like]: `%${cari}%` } },
        { "$tamu.alias$": { [Op.like]: `%${cari}%` } },
      ];
    }

    const result = await order_db.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: kamar_db,
          as: "kamar",
          required: true, // Ensure the kamar table is always joined
        },
        {
          model: tamu_db,
          as: "tamu",
          required: true, // Ensure the tamu table is always joined
        },
      ],
      subQuery: false,
    });

    const totalPages = Math.ceil(result.count / limit);

    Resp(res, "OK", "Success!", {
      data: result.rows,
      pagination: {
        totalItems: result.count,
        totalPages: totalPages !== 0 ? totalPages : 1,
        currentPage: parseInt(page),
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.log(error);
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};

exports.get_order_detail = async (req, res) => {
  const { id } = req.params;
  try {
    const getOrder = await order_db.findOne({
      where: { id: id },
      include: [
        {
          model: kamar_db,
          as: "kamar",
          required: false,
        },
        {
          model: tamu_db,
          as: "tamu",
          required: false,
        },
      ],
    });
    const getOrderData = await getOrder["dataValues"];

    // kamar
    const tipeKamarId = getOrderData["kamar"].tipe_kamar_id;

    const getTipeKamar = await tipe_kamar_db.findOne({
      where: {
        id: tipeKamarId,
      },
    });

    const getTipeKamarData = await getTipeKamar["dataValues"];
    const tipeKamar = getTipeKamarData.tipe;

    // time diff
    const tanggalCI = getOrderData["tgl_checkin"];
    const tanggalCO = getOrderData["tgl_checkout"];

    const diffDate = calculateDateDifference(tanggalCI, tanggalCO);

    // price and calc
    const harga = extractNumberFromCurrency(getOrderData["kamar"].harga);
    const deposit = extractNumberFromCurrency(getOrderData.jumlah_deposit);

    const subtotal = harga * diffDate;
    const ppn = Math.round((subtotal * 11) / 100);

    const grandTotal = subtotal + ppn - deposit;

    Resp(res, "OK", "Success!", {
      tipeKamar: tipeKamar,
      harga: harga,
      qty: diffDate,
      subtotal: subtotal,
      ppn: ppn,
      deposit: deposit,
      grandTotal: grandTotal,
    });
    return;
  } catch (error) {
    console.log(error);
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};

exports.checkout_kamar = async (req, res) => {
  const { id } = req.params;
  try {
    const getOrder = await order_db.findOne({
      where: { id: id },
      include: [
        {
          model: kamar_db,
          as: "kamar",
          required: false,
        },
        {
          model: tamu_db,
          as: "tamu",
          required: false,
        },
      ],
    });
    const getOrderData = await getOrder["dataValues"];
    const kamarId = getOrderData.kamar.id;

    await order_db.update(
      { status_order: "CHECKED_OUT" },
      { where: { id: id } }
    );

    await kamar_db.update({ in_use: false }, { where: { id: kamarId } });

    Resp(res, "OK", "success!", { success: true });
    return;
  } catch (error) {
    console.log(error);
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};

exports.update_order = async (req, res) => {
  const {
    jumlah_dewasa,
    jumlah_anak,
    jumlah_deposit,
    tgl_checkout,
    waktu_checkout,
  } = req.body;

  const { id } = req.params;
  try {
    await order_db.update(
      {
        jumlah_dewasa,
        jumlah_anak,
        jumlah_deposit,
        tgl_checkout,
        waktu_checkout,
      },
      { where: { id: id } }
    );

    Resp(res, "OK", "Success!", { success: true });
    return;
  } catch (error) {
    console.log(error);
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};

exports.delete_order = async (req, res) => {
  const { id } = req.params;
  const { kamarId } = req.query;
  try {
    await order_db.destroy({ where: { id: id } });

    await kamar_db.update({ in_use: false }, { where: { id: kamarId } });

    Resp(res, "OK", "Success!", { success: true });
    return;
  } catch (error) {
    console.log(error);
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};
