module.exports = (sequelize, Sequelize) => {
  const TipeKamar = sequelize.define(
    "tipe_kamar",
    {
      tipe: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  TipeKamar.associate = (models) => {
    TipeKamar.hasMany(models.kamar, {
      foreignKey: "tipe_kamar_id",
      as: "kamar",
    });
  };

  return TipeKamar;
};
