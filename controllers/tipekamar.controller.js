const { Op } = require("sequelize");
const db = require("../db");
const { ERROR_MESSAGE_GENERAL } = require("../utils/Constants");
const { Resp } = require("../utils/Resp");
const tipe_kamar_db = db.tipe_kamar;

exports.add_tipe_kamar = async (req, res) => {
  const { tipe } = req.body;

  try {
    await tipe_kamar_db.create({
      tipe,
    });

    Resp(res, "OK", "Success!", { success: true });
    return;
  } catch (error) {
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};

exports.edit_tipe_kamar = async (req, res) => {
  const { tipe } = req.body;

  const { id } = req.params;

  try {
    await tipe_kamar_db.update(
      {
        tipe,
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

exports.get_all_tipe = async (req, res) => {
  const { page = 1, limit = 10, cari } = req.query;

  try {
    const offset = (page - 1) * limit;

    // Build the where condition for a single search query
    const whereCondition = {};

    if (cari) {
      whereCondition[Op.or] = [{ tipe: { [Op.like]: `%${cari}%` } }];
    }

    const result = await tipe_kamar_db.findAndCountAll({
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
    console.log(error);
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};

exports.delete_tipe_kamar = async (req, res) => {
  const { id } = req.params;

  try {
    await tipe_kamar_db.destroy({ where: { id: id } });

    Resp(res, "OK", "Success!", { success: true });
    return;
  } catch (error) {
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};
