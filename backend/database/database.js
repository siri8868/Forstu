const sequelize = require("./connection");
const User = require("../models/usersModel");

User.sync({
  alter: false,
});

module.exports = {
  sequelize,
  User,
};
