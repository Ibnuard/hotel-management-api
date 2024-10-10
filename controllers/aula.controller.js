const { Op } = require("sequelize");
const db = require("../db");
const { ERROR_MESSAGE_GENERAL } = require("../utils/Constants");
const { Resp } = require("../utils/Resp");
const { parseCurrency } = require("../utils/Utils");
const moment = require("moment");
const aula_db = db.aula;
const paket_db = db.paket;

exports.create_sewa = async (req, res) => {
  const { penyewa, tgl_awal_sewa, tgl_akhir_sewa, paket_id, jumlah_pax } =
    req.body;

  try {
    const currentDate = moment(new Date()).format("YYYYMMDD");
    const randomDigits = Math.floor(10000 + Math.random() * 90000); // Ensures it is a 5-digit number

    const INVOICE = `INV-AGRK2-AULA-${currentDate}-${randomDigits}`;

    // -- Get paket
    const getPaket = await paket_db.findOne({
      where: {
        id: paket_id,
      },
    });

    if (!getPaket) {
      Resp(res, "ERROR", "Paket tidak ditemukan", []);
      return;
    }

    const getPaketData = await getPaket["dataValues"];
    const paketPrice = getPaketData.harga_paket;

    // -- handle price
    const totalPaketPrice =
      parseInt(parseCurrency(paketPrice)) * jumlah_pax * 1500000;

    const ppn = (11 / 100) * totalPaketPrice;

    const finalPrice = totalPaketPrice + ppn;

    // -- create data
    await aula_db.create({
      invoice: INVOICE,
      penyewa,
      tgl_awal_sewa,
      tgl_akhir_sewa,
      paket_id,
      harga_paket: paketPrice,
      jumlah_pax,
      total_harga: finalPrice,
      status_sewa: "BOOKED",
    });

    Resp(res, "OK", "success!", { success: true });
    return;
  } catch (error) {
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};

exports.edit_sewa = async (req, res) => {
  const { penyewa, tgl_awal_sewa, tgl_akhir_sewa, paket_id, jumlah_pax } =
    req.body;
  const { id } = req.params;

  try {
    // -- Get paket
    const getPaket = await paket_db.findOne({
      where: {
        id: paket_id,
      },
    });

    if (!getPaket) {
      Resp(res, "ERROR", "Paket tidak ditemukan", []);
      return;
    }

    const getPaketData = await getPaket["dataValues"];
    const paketPrice = getPaketData.harga_paket;

    // -- handle price
    const totalPaketPrice =
      parseInt(parseCurrency(paketPrice)) * jumlah_pax * 1500000;

    const ppn = (11 / 100) * totalPaketPrice;

    const finalPrice = totalPaketPrice + ppn;

    // -- create data
    await aula_db.update(
      {
        penyewa,
        tgl_awal_sewa,
        tgl_akhir_sewa,
        paket_id,
        harga_paket: paketPrice,
        jumlah_pax,
        total_harga: finalPrice,
        status_sewa: "BOOKED",
      },
      { where: { id: id } }
    );

    Resp(res, "OK", "success!", { success: true });
    return;
  } catch (error) {
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};

exports.delete_sewa = async (req, res) => {
  const { id } = req.params;
  try {
    await aula_db.destroy({ where: { id: id } });
    Resp(res, "OK", "Success!", { success: true });
    return;
  } catch (error) {
    console.log(error);
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};

exports.get_sewa = async (req, res) => {
  const { page = 1, limit = 10, cari } = req.query;

  try {
    const offset = (page - 1) * limit;

    // Build the where condition for a single search query
    const whereCondition = {};

    if (cari) {
      whereCondition[Op.or] = [{ nama_penyewa: { [Op.like]: `%${cari}%` } }];
    }

    const result = await aula_db.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: paket_db,
          as: "paket",
          required: true, // Ensure the kamar table is always joined
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

exports.check_sewa = async (req, res) => {
  const { startDate, endDate } = req.body;
  try {
    const start = moment(startDate, "YYYY-MM-DD");
    const end = moment(endDate, "YYYY-MM-DD");

    const conflictingBookings = await aula_db.findAll({
      where: {
        [Op.or]: [
          {
            // Cek jika tgl_awal_sewa berada di dalam rentang tanggal yang diberikan
            tgl_awal_sewa: {
              [Op.between]: [
                start.format("YYYY-MM-DD"),
                end.format("YYYY-MM-DD"),
              ],
            },
          },
          {
            // Cek jika tgl_akhir_sewa berada di dalam rentang tanggal yang diberikan
            tgl_akhir_sewa: {
              [Op.between]: [
                start.format("YYYY-MM-DD"),
                end.format("YYYY-MM-DD"),
              ],
            },
          },
          {
            // Cek jika tanggal yang diberikan berada di dalam rentang sewa yang sudah ada
            [Op.and]: [
              {
                tgl_awal_sewa: {
                  [Op.lte]: start.format("YYYY-MM-DD"),
                },
              },
              {
                tgl_akhir_sewa: {
                  [Op.gte]: end.format("YYYY-MM-DD"),
                },
              },
            ],
          },
        ],
      },
    });

    if (conflictingBookings.length > 0) {
      Resp(res, "ERROR", "Sudah ada penyewa pada rentan tanggal tersebut.", []);
      return;
    }

    Resp(res, "OK", "Success!", { success: true });
    return;
  } catch (error) {
    console.log(error);
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};
