module.exports = (sequelize, Sequelize) => {
  const Aula = sequelize.define("aula", {
    invoice_id: {
      type: Sequelize.STRING,
    },
    penyewa: {
      type: Sequelize.JSON,
    },
    nama_penyewa: {
      type: Sequelize.STRING,
    },
    tgl_awal_sewa: {
      type: Sequelize.STRING,
    },
    tgl_akhir_sewa: {
      type: Sequelize.STRING,
    },
    paket_list: {
      type: Sequelize.JSON,
    },
    harga_aula: {
      type: Sequelize.STRING,
    },
    total_harga: {
      type: Sequelize.INTEGER,
    },
    status_sewa: {
      type: Sequelize.STRING,
    },
  });

  return Aula;
};
