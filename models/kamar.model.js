module.exports = (sequelize, Sequelize) => {
  const Kamar = sequelize.define("kamar", {
    nama_kamar: {
      type: Sequelize.STRING,
    },
    nomor_kamar: {
      type: Sequelize.STRING,
    },
    tipe_kamar_id: {
      type: Sequelize.INTEGER,
    },
    tipe_kamar: {
      type: Sequelize.STRING,
    },
    max_dewasa: {
      type: Sequelize.INTEGER,
    },
    max_anak: {
      type: Sequelize.INTEGER,
    },
    is_tersedia: {
      type: Sequelize.STRING,
    },
  });

  return Kamar;
};
