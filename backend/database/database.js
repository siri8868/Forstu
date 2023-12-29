const sequelize = require("./connection");
const User = require("../models/usersModel");
const collegeprofile = require("../models/collegeModel");
const Mahadbtprofiles = require("../models/mahadbtModel");


User.sync({
  alter: false,
});

collegeprofile.sync({
  alter: false,
});

Mahadbtprofiles.sync({
  alter: false
})

module.exports = {
  sequelize,
  User,
  collegeprofile
};
