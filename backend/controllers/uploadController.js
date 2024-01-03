// const { Op } = require("sequelize");
const { Sequelize, Op } = require('sequelize');
const multer = require('multer');
const xlsx = require('xlsx');
const reader = require("xlsx")

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// const ROLES = require("../helpers/roles");

const ExcelInfo = require("../models/testExcelModel");


// const { validationResult } = require("express-validator");
// const { createHmac } = require("crypto");

const dotenv = require("dotenv");
// const { Json } = require("sequelize/types/utils");
dotenv.config();

exports.uploadFile = (req, res) => {


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
  console.log("req.files.vivek::::::", req.files.vivek)
  // working code for excel file present in the body!!!!
  const workbook = xlsx.read(req.files.vivek.data, { type: 'buffer' });



  // const sheet = workbook.Sheets(workbook.SheetNames);
  // console.log("workrkrk", sheet)
  const sheetName = workbook.SheetNames[0]; // Assuming you want the first sheet
  const sheet = workbook.Sheets[sheetName];
  console.log("SHEETNAME :: ", sheetName)
  console.log("sheet", sheet)


  const data = xlsx.utils.sheet_to_json(sheet);
  console.log("Sheet Data:", data);


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
  ExcelInfo.bulkCreate(data);

  res.status(200).json({ message: 'File Uploaded and Data Insertion successfully' })
}
// catch (error) {
//   console.log(`Error in file upload ${error}`);
//   res.status(500).json({
//     message: "Some error occured while processing the file"
//   })

// }
// }
