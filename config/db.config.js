module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "anggrek-dev",
  dialect: "mariadb",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
