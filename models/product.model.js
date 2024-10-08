module.exports = (sequelize, Sequelize) => {
  const ProductKamar = sequelize.define(
    "product_kamar",
    {
      nama_product: {
        type: Sequelize.STRING,
      },
      harga_product: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return ProductKamar;
};
