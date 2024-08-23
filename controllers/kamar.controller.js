const db = require("../db");
const { Resp } = require("../utils/Resp");
const kamar_db = db.kamar;

exports.add_kamar = async (req, res) => {
  const {
    nama_kamar,
    nomor_kamar,
    tipe_kamar_id,
    max_dewasa,
    max_anak,
    is_tersedia,
  } = req.body;

  try {
    await kamar_db.create({
      nama_kamar: nama_kamar,
      nomor_kamar: nomor_kamar,
      tipe_kamar_id: tipe_kamar_id,
      tipe_kamar: "",
      max_dewasa: max_dewasa,
      max_anak: max_anak,
      is_tersedia: is_tersedia,
    });

    Resp(res, "OK", "Success!", { success: true });
    return;
  } catch (error) {
    Resp(res, "ERROR", ERROR_MESSAGE_GENERAL, []);
    return;
  }
};
