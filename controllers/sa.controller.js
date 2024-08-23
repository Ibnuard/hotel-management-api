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
