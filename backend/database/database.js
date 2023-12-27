const sequelize = require("./connection");
const User = require("../models/usersModel");
const collegeprofile = require("../models/collegeModel");


User.sync({
  alter: false,
});

collegeprofile.sync({
  alter: false,
});

module.exports = {
  sequelize,
  User,
  collegeprofile
};
