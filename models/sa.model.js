module.exports = (sequelize, Sequelize) => {
  const SA = sequelize.define(
    "super_admin",
    {
      userId: {
        type: Sequelize.STRING,
      },
      nama: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      email_password: {
        type: Sequelize.STRING,
      },
      aula_price: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return SA;
};
