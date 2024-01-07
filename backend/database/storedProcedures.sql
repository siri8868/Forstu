const { Sequelize } = require('sequelize');
const sequelize = require("./connection");
// const User = require("../models/usersModel");
// const collegeprofile = require("../models/collegeModel");
// const Mahadbtprofiles = require("../models/mahadbtModel");
const ExcelInfo = require('../models/testExcelModel');

// const { Op } = require("sequelize");
// const { Sequelize, Op } = require('sequelize');
// const multer = require('multer');
// const ExcelJS = require('exceljs');
// const xlsx = require('xlsx');
// const reader = require("xlsx")

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });




 exports.defineStoredProcedures = async () => {
  try {
    await sequelize.query(`
      DELIMITER //
      CREATE PROCEDURE UpdateCourseName()
      BEGIN
          UPDATE excel_profiles SET course_name = CONCAT('B.E ', course_name);
      END //
      DELIMITER ;
    `, { type: Sequelize.QueryTypes.RAW });

    console.log('Stored procedure UpdateCourseName created successfully');
  } catch (error) {
    console.error('Error creating stored procedure:', error);
  }

};

// module.exports = { defineStoredProcedures, sequelize };