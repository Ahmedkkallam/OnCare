const { Sequelize } = require("sequelize");
const db = require("../config/database");

const User = db.define("user", {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

// Create Table
User.sync();

module.exports = User;
