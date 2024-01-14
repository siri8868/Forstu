const sequelize = require("./connection");
const User = require("../models/usersModel");
const collegeprofile = require("../models/collegeModel");
const Mahadbtprofiles = require("../models/mahadbtModel");
const ExcelInfo = require("../models/testExcelModel");
const dummyModel = require("../models/dummyExcelModel");

User.sync({
  alter: false,
});

collegeprofile.sync({
  alter: false,
});

Mahadbtprofiles.sync({
  alter: false,
});

ExcelInfo.sync({
  alter: false,
});

dummyModel.sync({
  alter: false,
})

module.exports = {
  sequelize,
  User,
  collegeprofile,
};
