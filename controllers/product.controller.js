const { Op } = require("sequelize");
const db = require("../db");
const { ERROR_MESSAGE_GENERAL } = require("../utils/Constants");
const { Resp } = require("../utils/Resp");
const product_db = db.product;

exports.add = async (req, res) => {
  const { nama, harga } = req.body;

  try {
    await product_db.create({
      nama_product: nama,
      harga_product: harga,
    });

    Resp(res, "OK", "Success!", { success: true });
    return;
  } catch (error) {
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};

exports.edit = async (req, res) => {
  const { nama, harga } = req.body;

  const { id } = req.params;

  try {
    await product_db.update(
      {
        nama_product: nama,
        harga_product: harga,
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

exports.get_all = async (req, res) => {
  const { page = 1, limit = 10, cari } = req.query;

  try {
    const offset = (page - 1) * limit;

    // Build the where condition for a single search query
    const whereCondition = {};

    if (cari) {
      whereCondition[Op.or] = [{ nama_product: { [Op.like]: `%${cari}%` } }];
    }

    const result = await product_db.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit),
      offset: parseInt(offset),
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

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    await product_db.destroy({ where: { id: id } });

    Resp(res, "OK", "Success!", { success: true });
    return;
  } catch (error) {
    console.log(error);
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};
