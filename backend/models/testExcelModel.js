const { Sequelize } = require("sequelize");
const sequelize = require("../database/connection");
const ROLES = require("../helpers/roles");

const ExcelInfo = sequelize.define("excel_profiles", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    field: 'id',
  },

  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'name',
  },

  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
    unique: true,
    field: 'email',
  },

  age: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true,
    field: 'age',
  },
});

module.exports = ExcelInfo;