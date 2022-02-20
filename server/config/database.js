const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  "postgres://postgres:root@localhost:5432/oncare"
);
