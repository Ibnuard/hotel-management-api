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
    paket_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "paket_aulas", // Nama tabel terkait
        key: "id", // Primary key di tabel kamar
      },
      onDelete: "CASCADE", // Menghapus orders terkait saat kamar dihapus
      onUpdate: "CASCADE",
    },
    harga_paket: {
      type: Sequelize.STRING,
    },
    harga_aula: {
      type: Sequelize.STRING,
    },
    jumlah_pax: {
      type: Sequelize.INTEGER,
    },
    total_harga: {
      type: Sequelize.INTEGER,
    },
    status_sewa: {
      type: Sequelize.STRING,
    },
  });

  Aula.associate = (models) => {
    // Relasi dengan model Kamar
    Aula.belongsTo(models.paket, {
      foreignKey: "paket_id",
      as: "paket",
    });
  };

  return Aula;
};
