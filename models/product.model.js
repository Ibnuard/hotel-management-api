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

  // Associations
  ProductKamar.associate = (models) => {
    ProductKamar.belongsToMany(models.order, {
      through: models.order_product,
      foreignKey: "product_kamar_id",
      otherKey: "order_id",
      as: "orders",
    });
  };

  return ProductKamar;
};
