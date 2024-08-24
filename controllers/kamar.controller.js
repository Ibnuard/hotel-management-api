const { Op } = require("sequelize");
const db = require("../db");
const { ERROR_MESSAGE_GENERAL } = require("../utils/Constants");
const { Resp } = require("../utils/Resp");
const kamar_db = db.kamar;
const tipe_kamar_db = db.tipe_kamar;

exports.add_kamar = async (req, res) => {
  const {
    nama_kamar,
    nomor_kamar,
    tipe_kamar_id,
    max_dewasa,
    max_anak,
    harga,
    is_tersedia,
  } = req.body;

  try {
    await kamar_db.create({
      nama_kamar: nama_kamar,
      nomor_kamar: nomor_kamar,
      tipe_kamar_id: tipe_kamar_id,
      max_dewasa: max_dewasa,
      max_anak: max_anak,
      is_tersedia: is_tersedia,
      harga: harga,
      in_use: false,
    });

    Resp(res, "OK", "Success!", { success: true });
    return;
  } catch (error) {
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};

exports.edit_kamar = async (req, res) => {
  const {
    nama_kamar,
    nomor_kamar,
    tipe_kamar_id,
    max_dewasa,
    max_anak,
    harga,
    is_tersedia,
  } = req.body;

  const { id } = req.params;

  try {
    await kamar_db.update(
      {
        nama_kamar: nama_kamar,
        nomor_kamar: nomor_kamar,
        tipe_kamar_id: tipe_kamar_id,
        max_dewasa: max_dewasa,
        max_anak: max_anak,
        harga: harga,
        is_tersedia: is_tersedia,
      },
      {
        where: {
          id: id,
        },
      }
    );

    Resp(res, "OK", "Success!", { success: true });
    return;
  } catch (error) {
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};

exports.get_all_kamar = async (req, res) => {
  const { page = 1, limit = 10, cari } = req.query;

  try {
    const offset = (page - 1) * limit;

    // Build the where condition for a single search query
    const whereCondition = {};

    if (cari) {
      whereCondition[Op.or] = [
        { nama_kamar: { [Op.like]: `%${cari}%` } },
        { nomor_kamar: { [Op.like]: `%${cari}%` } },
        { tipe_kamar_id: { [Op.like]: `%${cari}%` } }, // Assuming tipe_kamar_id is a string; if it's an integer, remove Op.like
      ];
    }

    const result = await kamar_db.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: tipe_kamar_db,
          as: "tipeKamar", // Sesuaikan dengan alias yang digunakan saat mendefinisikan relasi
        },
      ],
    });

    const totalPages = Math.ceil(result.count / limit);

    Resp(res, "OK", "Success!", {
      data: result.rows,
      pagination: {
        totalItems: result.count,
        totalPages: totalPages,
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

exports.delete_kamar = async (req, res) => {
  const { id } = req.params;

  try {
    await kamar_db.destroy({ where: { id: id } });

    Resp(res, "OK", "Success!", { success: true });
    return;
  } catch (error) {
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};

// ops

exports.get_ready_kamar = async (req, res) => {
  const { page = 1, limit = 10, cari } = req.query;

  try {
    const offset = (page - 1) * limit;

    // Build the where condition for a single search query
    const whereCondition = {
      in_use: false,
      is_tersedia: 1,
    };

    if (cari) {
      whereCondition[Op.or] = [
        { nama_kamar: { [Op.like]: `%${cari}%` } },
        { nomor_kamar: { [Op.like]: `%${cari}%` } },
        { tipe_kamar_id: { [Op.like]: `%${cari}%` } }, // Assuming tipe_kamar_id is a string; if it's an integer, remove Op.like
      ];
    }

    const result = await kamar_db.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: tipe_kamar_db,
          as: "tipeKamar", // Sesuaikan dengan alias yang digunakan saat mendefinisikan relasi
        },
      ],
    });

    const totalPages = Math.ceil(result.count / limit);

    Resp(res, "OK", "Success!", {
      data: result.rows,
      pagination: {
        totalItems: result.count,
        totalPages: totalPages,
        currentPage: parseInt(page),
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};
