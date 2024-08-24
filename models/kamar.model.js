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
      references: {
        model: "tipe_kamars", // name of the target model
        key: "id", // key in the target model that the foreign key is associated with
      },
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
    in_use: {
      type: Sequelize.BOOLEAN,
    },
  });

  Kamar.associate = (models) => {
    Kamar.belongsTo(models.tipe_kamar, {
      foreignKey: "tipe_kamar_id",
      as: "tipeKamar",
    });
  };

  return Kamar;
};
