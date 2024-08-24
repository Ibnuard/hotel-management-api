const { Op } = require("sequelize");
const db = require("../db");
const { ERROR_MESSAGE_GENERAL } = require("../utils/Constants");
const { Resp } = require("../utils/Resp");
const tamu_db = db.tamu;

exports.add_tamu = async (req, res) => {
  const {
    nama_depan,
    nama_belakang,
    alias,
    sex,
    tipe_identitas,
    nomor_identitas,
    asal_negara,
    alamat,
    kabupaten,
    provinsi,
    no_telp,
    email,
  } = req.body;

  try {
    await tamu_db.create({
      nama_depan,
      nama_belakang,
      alias,
      sex,
      tipe_identitas,
      nomor_identitas,
      asal_negara,
      alamat,
      kabupaten,
      provinsi,
      no_telp,
      email,
    });

    Resp(res, "OK", "Success!", { success: true });
    return;
  } catch (error) {
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};

exports.edit_tamu = async (req, res) => {
  const {
    nama_depan,
    nama_belakang,
    alias,
    sex,
    tipe_identitas,
    nomor_identitas,
    asal_negara,
    alamat,
    kabupaten,
    provinsi,
    no_telp,
    email,
  } = req.body;

  const { id } = req.params;

  try {
    await tamu_db.update(
      {
        nama_depan,
        nama_belakang,
        alias,
        sex,
        tipe_identitas,
        nomor_identitas,
        asal_negara,
        alamat,
        kabupaten,
        provinsi,
        no_telp,
        email,
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

exports.get_all_tamu = async (req, res) => {
  const { page = 1, limit = 10, cari } = req.query;

  try {
    const offset = (page - 1) * limit;

    // Build the where condition for a single search query
    const whereCondition = {};

    if (cari) {
      whereCondition[Op.or] = [
        { nama_depan: { [Op.like]: `%${cari}%` } },
        { nama_belakang: { [Op.like]: `%${cari}%` } },
        { nomor_identitas: { [Op.like]: `%${cari}%` } },
        { alias: { [Op.like]: `%${cari}%` } }, // Assuming tipe_kamar_id is a string; if it's an integer, remove Op.like
      ];
    }

    const result = await tamu_db.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit),
      offset: parseInt(offset),
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

exports.delete_tamu = async (req, res) => {
  const { id } = req.params;

  try {
    await tamu_db.destroy({ where: { id: id } });

    Resp(res, "OK", "Success!", { success: true });
    return;
  } catch (error) {
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};
