const md5 = require("md5");
const db = require("../db");
const { Resp } = require("../utils/Resp");
const { ERROR_MESSAGE_GENERAL } = require("../utils/Constants");
const sa_db = db.sa;

exports.sa_login = async (req, res) => {
  const { userid, password } = req.body;

  try {
    if (!userid || !password) {
      Resp(res, "ERROR", "UserID atau password tidak boleh kosong.", []);
      return;
    }

    const getUser = await sa_db.findOne({ where: { userId: userid } });

    if (!getUser) {
      Resp(res, "ERROR", "User tidak ditemukan.", []);
      return;
    }

    const getUserData = await getUser["dataValues"];

    const encPassword = md5(password);

    if (encPassword !== getUserData.password) {
      Resp(res, "ERROR", "Password tidak sesuai.", []);
      return;
    }

    delete getUserData.password;
    delete getUserData.id;

    Resp(res, "OK", "Succes!", getUserData);
    return;
  } catch (error) {
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};

exports.get_sa = async (req, res) => {
  try {
    const getData = await sa_db.findOne({ where: { id: 1 } });
    const getDataSA = await getData["dataValues"];

    delete getDataSA.password;
    Resp(res, "OK", "Success!", getDataSA);
    return;
  } catch (error) {
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};

exports.update_sa = async (req, res) => {
  const { email, email_password, password } = req.body;
  try {
    if (password) {
      await sa_db.update({ password: md5(password) }, { where: { id: 1 } });
    }

    await sa_db.update({ email, email_password }, { where: { id: 1 } });

    Resp(res, "OK", "Success!", { success: true });
    return;
  } catch (error) {
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};
