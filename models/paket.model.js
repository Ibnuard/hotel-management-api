module.exports = (sequelize, Sequelize) => {
  const PaketAula = sequelize.define(
    "paket_aula",
    {
      nama_paket: {
        type: Sequelize.STRING,
      },
      harga_paket: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return PaketAula;
};
