module.exports = (sequelize, Sequelize) => {
  const OrderProduct = sequelize.define("order_product", {
    order_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "orders", // The table name for Order
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    product_kamar_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "product_kamars", // The table name for ProductKamar
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1, // Default quantity
    },
  });

  return OrderProduct;
};
