const { DataTypes } = require('sequelize');
const sequelize = require("../database/connection");
const { Sequelize } = require("sequelize");

const MahadbtCollegeStream = sequelize.define('mahadbt_college_stream', {
  stream_id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  college_id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: true,
  },

  stream_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = MahadbtCollegeStream;