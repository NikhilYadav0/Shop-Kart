const sequelize = require("../util/database");
const Sequelize = require("sequelize");
const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING
});

module.exports = User;
