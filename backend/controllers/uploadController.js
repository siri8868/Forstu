const { Op } = require("sequelize");
const { Sequelize, Op } = require("sequelize");
const multer = require("multer");
const ExcelJS = require("exceljs");
const xlsx = require("xlsx");
// const reader = require("xlsx")
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// const ROLES = require("../helpers/roles");
// const ExcelInfo = require("../models/testExcelModel");
const ExcelInfo = require("../models/testExcelModel");
// const { validationResult } = require("express-validator");
// const { createHmac } = require("crypto");
const dotenv = require("dotenv");
// const { defineStoredProcedures } = require('../database/storedProcedures');
// const { Json } = require("sequelize/types/utils");
dotenv.config();
// exports.uploadFile = (req, res) => {
// try {
// assuming th uploaded fie contains 'id','name','email','age' columns
// console.log("MAIN:::", req.files.vivek.name)
// const file = reader.readFile("")
// let data = []
// const sheets = file.SheetNames
// for (let i = 0; i < sheets.length; i++) {./helpers/deepakdata.xlsx
//   const temp = reader.utils.sheet_to_json(
//     file.Sheets[file.SheetNames[i]])
//   temp.forEach((res) => {
//     data.push(res)
//   })
// }
// Printing data
// console.log(data)
// working code for excel file present in helper folder
// const workbook = reader.readFile("./helpers/deepakdata.xlsx", { type: 'buffer' });
// console.log("req.files.vivek::::::", req.files.vivek)
// working code for excel file present in the body!!!!
// const workbook = xlsx.read(req.files.vivek.data, { type: 'buffer' });
// const sheet = workbook.Sheets(workbook.SheetNames);
// console.log("workrkrk", sheet)
// const sheetName = workbook.SheetNames[0]; // Assuming you want the first sheet
// const sheet = workbook.Sheets[sheetName];
// console.log("SHEETNAME :: ", sheetName)
// console.log("sheet", sheet)
// const data = xlsx.utils.sheet_to_json(sheet);
// console.log("Sheet Data:", data);
// if (hasData) {
//   const data = xlsx.utils.sheet_to_json(sheet);
//   console.log("Sheet Data:", data);
// } else {
//   console.log("Sheet is empty or starts from A1");
// }
// }
// else {
//   console.log("Sheet is empty or starts from A1");
// }
// const data = xlsx.utils.sheet_add_json(sheet);
//Insert data into Mahadbt profiles table
// console.log("daatatatat", data)
// console.log("Data from Excel:", data);
// ExcelInfo.bulkCreate(data);
// res.status(200).json({ message: 'File Uploaded and Data Insertion successfully' });
// try {
//   ExcelInfo.bulkCreate(data);
//   console.log("Data inserted successfully");
// } catch (error) {
//   console.error("Error inserting data:", error);
// }
/// This code for reading excel file
//   const workbook = new ExcelJS.Workbook();
//   const filePath = 'C:/Users/rahul/OneDrive/Desktop/Forstu/backend/helpers/RCPIT UPLOAD/example.xlsx';
//   console.log("filename", filepath)
//   workbook.xlsx.read(filePath)
//     .then(() => {
//       const worksheet = workbook.getWorksheet(1);
//       console.log("workSheeeettt", worksheet);
//       // return
//       worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
//         YourModel.create({
//           applicationId: row.getCell(B).value,
//           candidateName: row.getCell(C).value,
//           gender: row.getCell(D).value,
//           dob: row.getCell(E).value,
//           sscBoard: row.getCell(G).value,
//           sscPassingYear: row.getCell(H).value,
//           sscSeatNo: row.getCell(I).value,
//           sscTotalPercentage: row.getCell(K).value,
//           qualifyingExam: row.getCell(L).value,
//           hscBoard: row.getCell(M).value,
//           hscPassingYear: row.getCell(N).value,
//           hscSeatNo: row.getCell(O).value,
//           hscTotalPercentage: row.getCell(V).value,
//           cetPercentile: row.getCell(Y).value,
//           courseName: row.getCell(AD).value,
//           // Map other columns as needed
//         });
//       });
//     })
//     .catch(error => {
//       console.error('Error reading Excel file:', error);
//     });
// } catch (error) {
//   console.log(`Error in file upload ${error}`);
//   res.status(500).json({
//     message: "Some error occured while processing the file"
//   })
// }
//
exports.uploadFile = async (req, res) => {
  console.log("req.files.vivek::::::", req.files.vivek);
  // working code for excel file present in the body!!!!
  const workbook = xlsx.read(req.files.vivek.data, { type: "buffer" });
  const sheetName = workbook.SheetNames[0]; // Assuming you want the first sheet
  const sheet = workbook.Sheets[sheetName];
  console.log("SHEETNAME :: ", sheetName);
  const data = xlsx.utils.sheet_to_json(sheet);
  console.log("Sheet Data:", data);
  try {
    // ExcelInfo.bulkCreate(data);
    const filteredData = data.map((item) => ({
      // applicationId = field
      // Application ID = column name in excel file
      applicationId: item["Application ID"],
      candidateName: item["Candidate Name"],
      gender: item["Gender"],
      dob: new Date(item["DOB"]), // Assuming DOB is in a valid date format
      sscBoard: item["SSC Board"],
      sscPassingYear: item["SSC Passing Year"],
      sscSeatNo: item["SSC Seat No"],
      sscTotalPercentage: item["SSC Total Percentage"],
      qualifyingExam: item["Qualifying Exam"],
      hscBoard: item["HSC Board"],
      hscPassingYear: item["HSC Passing Year"],
      hscSeatNo: item["HSC Seat No"],
      hscTotalPercentage: item["HSC Total Percentage"],
      cetPercentile: item["CET Percentile"],
      courseName: item["Course Name"],
    }));
    // Bulk insert the filtered data into the ExcelInfo table
    // ExcelInfo.bulkCreate(filteredData);
    const createdData = await ExcelInfo.bulkCreate(filteredData);
    console.log("Data inserted successfully", createdData);
    // Read the stored procedure SQL file
    // const sqlFilePath = path.join(__dirname, 'updateCourseNameProcedure.sql');
    // // const sqlFilePath = path.join(__dirname, '..', 'updateCourseNameProcedure.sql');
    // const storedProcedureQuery = fs.readFileSync(sqlFilePath, 'utf8');
    // // Execute the stored procedure
    // await sequelize.query(storedProcedureQuery, {
    //   type: Sequelize.QueryTypes.RAW,
    // });
    res.json({
      success: true,
      data: createdData,
      message: "Data inserted successfully",
    });
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};
