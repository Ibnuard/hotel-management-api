module.exports = (sequelize, Sequelize) => {
  const Tamu = sequelize.define("tamu", {
    nama_depan: {
      type: Sequelize.STRING,
    },
    nama_belakang: {
      type: Sequelize.STRING,
    },
    alias: {
      type: Sequelize.STRING,
    },
    sex: {
      type: Sequelize.STRING,
    },
    tipe_identitas: {
      type: Sequelize.STRING,
    },
    nomor_identitas: {
      type: Sequelize.STRING,
    },
    asal_negara: {
      type: Sequelize.STRING,
    },
    alamat: {
      type: Sequelize.STRING,
    },
    kabupaten: {
      type: Sequelize.STRING,
    },
    provinsi: {
      type: Sequelize.STRING,
    },
    no_telp: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
  });

  return Tamu;
};
