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
    },
    {
      timestamps: false,
    }
  );

  return SA;
};
