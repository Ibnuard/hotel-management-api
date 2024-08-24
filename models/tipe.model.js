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

  return TipeKamar;
};
