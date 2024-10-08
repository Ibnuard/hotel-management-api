module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    invoice_id: {
      type: Sequelize.STRING,
    },
    tamu_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "tamus", // Nama tabel terkait (sesuaikan dengan nama tabel Anda)
        key: "id", // Primary key di tabel tamu
      },
    },
    jumlah_dewasa: {
      type: Sequelize.INTEGER,
    },
    jumlah_anak: {
      type: Sequelize.INTEGER,
    },
    jumlah_deposit: {
      type: Sequelize.STRING,
    },
    tgl_checkin: {
      type: Sequelize.STRING,
    },
    waktu_checkin: {
      type: Sequelize.STRING,
    },
    tgl_checkout: {
      type: Sequelize.STRING,
    },
    waktu_checkout: {
      type: Sequelize.STRING,
    },
    kamar_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "kamars", // Nama tabel terkait
        key: "id", // Primary key di tabel kamar
      },
      onDelete: "CASCADE", // Menghapus orders terkait saat kamar dihapus
      onUpdate: "CASCADE",
    },
    status_order: {
      type: Sequelize.STRING,
    },
    additional_service: {
      type: Sequelize.JSON,
    },
  });

  Order.associate = (models) => {
    // Relasi dengan model Tamu
    Order.belongsTo(models.tamu, {
      foreignKey: "tamu_id",
      as: "tamu",
    });

    // Relasi dengan model Kamar
    Order.belongsTo(models.kamar, {
      foreignKey: "kamar_id",
      as: "kamar",
    });
  };

  return Order;
};
