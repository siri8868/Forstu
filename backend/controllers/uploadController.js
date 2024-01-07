// const { Op } = require("sequelize");
const { Sequelize, Op } = require("sequelize");
const multer = require("multer");
const xlsx = require("xlsx");
const reader = require("xlsx");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// const ROLES = require("../helpers/roles");

const ExcelInfo = require("../models/testExcelModel");

// const { validationResult } = require("express-validator");
// const { createHmac } = require("crypto");

const dotenv = require("dotenv");
// const { Json } = require("sequelize/types/utils");
dotenv.config();

// exports.uploadFile = (req, res) => {

//   // try {
//   // assuming th uploaded fie contains 'id','name','email','age' columns
//   // console.log("MAIN:::", req.files.vivek.name)
//   // const file = reader.readFile("")

//   // let data = []

//   // const sheets = file.SheetNames

//   // for (let i = 0; i < sheets.length; i++) {./helpers/deepakdata.xlsx
//   //   const temp = reader.utils.sheet_to_json(
//   //     file.Sheets[file.SheetNames[i]])
//   //   temp.forEach((res) => {
//   //     data.push(res)
//   //   })
//   // }

//   // Printing data
//   // console.log(data)

//   // working code for excel file present in helper folder
//   // const workbook = reader.readFile("./helpers/deepakdata.xlsx", { type: 'buffer' });
//   console.log("req.files.vivek::::::", req.files.vivek)
//   // working code for excel file present in the body!!!!
//   const workbook = xlsx.read(req.files.vivek.data, { type: 'buffer' });

//   // const sheet = workbook.Sheets(workbook.SheetNames);
//   // console.log("workrkrk", sheet)
//   const sheetName = workbook.SheetNames[0]; // Assuming you want the first sheet
//   const sheet = workbook.Sheets[sheetName];
//   console.log("SHEETNAME :: ", sheetName)
//   // console.log("sheet", sheet)

//   const data = xlsx.utils.sheet_to_json(sheet);
//   console.log("Sheet Data:", data);

//   // if (hasData) {
//   //   const data = xlsx.utils.sheet_to_json(sheet);
//   //   console.log("Sheet Data:", data);
//   // } else {
//   //   console.log("Sheet is empty or starts from A1");
//   // }
//   // }
//   // else {
//   //   console.log("Sheet is empty or starts from A1");
//   // }

//   // const data = xlsx.utils.sheet_add_json(sheet);

//   //Insert data into Mahadbt profiles table
//   // console.log("daatatatat", data)
//   // console.log("Data from Excel:", data);
//   // ExcelInfo.bulkCreate(data);

//   res.status(200).json({ message: 'File Uploaded and Data Insertion successfully' });
//   try {
//     ExcelInfo.bulkCreate(data);
//     console.log("Data inserted successfully");
//   } catch (error) {
//     console.error("Error inserting data:", error);
//   }
// }
// catch (error) {
//   console.log(`Error in file upload ${error}`);
//   res.status(500).json({
//     message: "Some error occured while processing the file"
//   })

// }
// }

// exports.uploadFile = async (req, res) => {
//   console.log("req.files.vivek::::::", req.files.vivek);
//   // working code for excel file present in the body!!!!
//   const workbook = xlsx.read(req.files.vivek.data, { type: "buffer" });

//   const sheetName = workbook.SheetNames[0]; // Assuming you want the first sheet
//   const sheet = workbook.Sheets[sheetName];
//   console.log("SHEETNAME :: ", sheetName);

//   const data = xlsx.utils.sheet_to_json(sheet);
//   console.log("Sheet Data:", data);

//   try {
//     // ExcelInfo.bulkCreate(data);
//     const filteredData = data.map((item) => ({
//       "Application ID": item["Application ID"],
//       "Candidate Name": item["Candidate Name"],
//       Gender: item["Gender"],
//       DOB: new Date(item["DOB"]), // Assuming DOB is in a valid date format
//       "SSC Board": item["SSC Board"],
//       "SSC Passing Year": item["SSC Passing Year"],
//       "SSC Seat No": item["SSC Seat No"],
//       "SSC Total Percentage": item["SSC Total Percentage"],
//       "Qualifying Exam": item["Qualifying Exam"],
//       "HSC Board": item["HSC Board"],
//       "HSC Passing Year": item["HSC Passing Year"],
//       "HSC Seat No": item["HSC Seat No"],
//       "HSC Total Percentage": item["HSC Total Percentage"],
//       "CET Percentile": item["CET Percentile"],
//       "Course Name": item["Course Name"],
//     }));
//     // Bulk insert the filtered data into the ExcelInfo table
//     // ExcelInfo.bulkCreate(filteredData);
//     const createdData = await ExcelInfo.bulkCreate(filteredData);
//     console.log("Data inserted successfully", createdData);
//     res.json({
//       success: true,
//       data: createdData,
//       message: "Data inserted successfully",
//     });
//   } catch (error) {
//     console.error("Error inserting data:", error);
//   }
// };

exports.uploadFile = async (req, res) => {
  try {
    console.log("req.files.vivek::::::", req.files.vivek);
    const workbook = xlsx.read(req.files.vivek.data, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    console.log("SHEETNAME :: ", sheetName);

    const data = xlsx.utils.sheet_to_json(sheet);
    console.log("Sheet Data:", data);

    const filteredData = data.map((item) => ({
      ApplicationID: item["Application ID"],
      CandidateName: item["Candidate Name"],
      // Gender: item["Gender"],
      // DOB: new Date(item["DOB"]),
      // SSCBoard: item["SSC Board"],
      // SSCPassingYear: item["SSC Passing Year"],
      // SSCSeatNo: item["SSC Seat No"],
      // SSCTotalPercentage: item["SSC Total Percentage"],
      // QualifyingExam: item["Qualifying Exam"],
      // HSCBoard: item["HSC Board"],
      // HSCPassingYear: item["HSC Passing Year"],
      // HSCSeatNo: item["HSC Seat No"],
      // HSCTotalPercentage: item["HSC Total Percentage"],
      // CETPercentile: item["CET Percentile"],
      // CourseName: item["Course Name"],
    }));

    // Insert the data into the database using bulkCreate
    const createdData = await ExcelInfo.bulkCreate(filteredData);

    console.log("Data inserted successfully", createdData);

    // Check if the createdData actually contains the inserted data
    // if (createdData.length !== filteredData.length) {
    //   console.error("Some data might not have been inserted correctly!");
    //   console.error("Data attempting to insert:", filteredData);
    // }

    res.json({
      success: true,
      data: createdData,
      message: "Data inserted successfully",
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({
      success: false,
      message: "Error inserting data",
      error: error.message, // Return the specific error message
    });
  }
};
