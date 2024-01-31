// const { Op } = require("sequelize");
const { Sequelize, Op } = require("sequelize");
const multer = require("multer");
const ExcelJS = require("exceljs");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");
const { QueryTypes } = require("sequelize");

const storage = multer.memoryStorage();

// const ExcelInfo = require("../models/testExcelModel");
const Mahadbtprofiles = require("../models/mahadbtModel");


// const executeStoredProcedure = require('./database/storedProcedures');
const dotenv = require("dotenv");
const sequelize = require("../database/connection");
const dummyModel = require("../models/dummyExcelModel");

dotenv.config();

async function createStoredProcedure() {
  // Assuming 'sequelize' is your Sequelize instance
  sequelize
    .query("DROP PROCEDURE IF EXISTS NewTest2", { type: QueryTypes.RAW })
    .then(() => {
      return sequelize.query(
        `
    CREATE PROCEDURE NewTest2()
    BEGIN
      UPDATE mahadbt_profiles
      SET coursename = 'rahul'
      WHERE coursename = 'vivek';

      UPDATE mahadbt_profiles
      SET CasteCategory = 'JayBhim'
      WHERE CasteCategory = 'Open';

      UPDATE excel_profiles
      SET qualifyingExam = 'H.S.C. (12 Std)'
      WHERE qualifyingExam = 'HSC';
    END;
  `,
        { type: QueryTypes.RAW }
      );
    })
    .then((result) => {
      console.log("Procedure created successfully:", result);
    })
    .catch((error) => {
      console.error("Error executing procedure creation:", error);
    });
}

const UpdateClass12BoardData = async () => {
  try {
    await sequelize.query(`
      CREATE PROCEDURE UpdateClass12Board()
      BEGIN
          UPDATE excel_profiles
          SET hscBoard = 'MAHARASHTRA STATE BOARD OF SECONDARY AND HIGHER SECONDARY EDUCATION'
          WHERE hscBoard LIKE '%Maharashtra State Board of Secondary Education , Pune%';
      END;
    `);

    console.log("Stored procedure created successfully.");

    // Execute the stored procedure
    // const result = await sequelize.query('CALL UpdateClass12Board', { type: Sequelize.QueryTypes.RAW });
    // console.log('Stored procedure result:', result[0]);
  } catch (error) {
    console.error("Error creating or executing stored procedure:", error);
  } finally {
    // Don't forget to remove the stored procedure afterward if needed
    await sequelize.query("DROP PROCEDURE IF EXISTS UpdateClass10Board");
  }
};

async function loadAndExecuteStoredProcedure() {
  const result = await sequelize.query("CALL updateData()", {
    type: Sequelize.QueryTypes.RAW,
  });
  // console.log('Stored procedure result:', result[0]);
  // Log the structure of the result to understand its format
  console.log("Result structure:", result);

  // Process the result as needed
  // console.log("FINALLLL", result);
}

exports.uploadFile = async (req, res) => {
  // console.log("req.files.vivek::::::", req.files.vivek);
  // working code for excel file present in the body!!!!
  const workbook = xlsx.read(req.files.vivek.data, { type: "buffer" });
  const sheetName = workbook.SheetNames[0]; // Assuming you want the first sheet
  const sheet = workbook.Sheets[sheetName];
  // console.log("SHEETNAME :: ", sheetName);
  const data = xlsx.utils.sheet_to_json(sheet);

  // console.log("Sheet Data:", data);

  //   try {
  //     const batchSize = 10; // Set your desired batch size
  //     const totalRecords = data.length;

  //     for (let i = 0; i < totalRecords; i += batchSize) {
  //       const batch = data.slice(i, i + batchSize);

  //       const filteredData = batch.map((item) => ({
  //         admissionApplicationId: item["Application ID"],
  //         candidateName: item["Candidate Name"],
  //         gender: item["Gender"],
  //         dob: new Date(item["DOB"]), // Assuming DOB is in a valid date format
  //         class10Board: item["SSC Board"],
  //         class10PassingYear: item["SSC Passing Year"],
  //         class10SeatNumber: item["SSC Seat No"],
  //         class10Percentage: item["SSC Total Percentage"],
  //         prev_qualification_level: item["Qualifying Exam"],
  //         class12Board: item["HSC Board"],
  //         class12PassingYear: item["HSC Passing Year"],
  //         class12SeatNumber: item["HSC Seat No"],
  //         class12Percentage: item["HSC Total Percentage"],
  //         cetPercentAge: item["CET Percentile"],
  //         coursename: item["Course Name"],
  //       }));

  //       const createdData = await dummyModel.bulkCreate(filteredData, {
  //         updateOnDuplicate: ["email"],
  //         // ignoreDuplicates: true,
  //       });

  //       console.log(`Batch ${i / batchSize + 1} inserted successfully.`);
  //     }

  //     console.log("All data inserted successfully");
  //     res.json({
  //       success: true,
  //       message: "All data inserted successfully",
  //     });
  //   } catch (error) {
  //     console.error("Error inserting data:", error);
  //     res.json({
  //       success: false,
  //       message: "Error inserting data",
  //     });
  //   }
  // }

  try {
    // ExcelInfo.bulkCreate(data);

    const filteredData = data.map((item) => ({
      // applicationId = field
      // Application ID = column name in excel file
      admissionApplicationId: item["Application ID"],
      candidateName: item["Candidate Name"],
      gender: item["Gender"],
      dob: new Date(item["DOB"]), // Assuming DOB is in a valid date format
      class10Board: item["SSC Board"],
      class10PassingYear: item["SSC Passing Year"],
      class10SeatNumber: item["SSC Seat No"],
      class10Percentage: item["SSC Total Percentage"],
      prev_qualification_level: item["Qualifying Exam"],
      class12Board: item["HSC Board"],
      class12PassingYear: item["HSC Passing Year"],
      class12SeatNumber: item["HSC Seat No"],
      class12Percentage: item["HSC Total Percentage"],
      cetPercentAge: item["CET Percentile"],
      coursename: item["Course Name"],
      email: item["Email"],
      casteCategory: item['Catogory'],
      ref_code: item['REF_CODE'],
      applicationStatus: item['Application Status'],
      currentYear: item['Course Year'],


      // This option will prevent the error from stopping the execution

      // prev_qualification_level :item["Qualifying Exam"]
    }));

    // Bulk insert the filtered data into the ExcelInfo table
    // await dummyModel.bulkCreate(filteredData);
    // ExcelInfo.bulkCreate(filteredData);
    // const createdData = await dummyModel.bulkCreate(filteredData);
    // console.log("filtered dataaaaaaa", filteredData);


    // const createdData = await dummyModel.bulkCreate(filteredData, {
    const createdData = await Mahadbtprofiles.bulkCreate(filteredData, {
      updateOnDuplicate: ["email"], // Specify the fields to update in case of duplicates
      // ignoreDuplicates: true, // This option will prevent the error from stopping the execution
    });


    console.log("Data inserted successfully", createdData);
    // return
    console.log("Data inserted successfully");
    setTimeout(() => {
      console.log("Delayed for 5 second.");
      loadAndExecuteStoredProcedure();
      res.json({
        success: true,
        message: "Data inserted successfully",
        data: createdData
      });
    }, "5000");
    // loadAndExecuteStoredProcedure()
    // res.json({
    //   success: true,
    //   message: "Data inserted successfully",
    //   data: createdData
    // });
  } catch (error) {
    console.error("Error inserting data:", error);
  }

  // Call the function to execute the stored procedure
}

exports.runTheProcedure = async (req, res) => {
  console.log("test called");
  loadAndExecuteStoredProcedure();
  // UpdateHSCBoard();
  // executeUpdateCourseNameProcedure();
  res.json({ success: true, message: "test called" });
};

console.log("dfdsfs");
exports.createStoreProcedure = async (req, res) => {
  console.log("test called");
  createStoredProcedure();
  UpdateClass12BoardData();
  res.json({ success: true, message: "test called" });
};
