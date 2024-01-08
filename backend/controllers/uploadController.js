// const { Op } = require("sequelize");
const { Sequelize, Op } = require("sequelize");
const multer = require("multer");
const ExcelJS = require("exceljs");
const xlsx = require("xlsx");

const storage = multer.memoryStorage();

const ExcelInfo = require("../models/testExcelModel");
// const executeStoredProcedure = require('./database/storedProcedures');
const dotenv = require("dotenv");

dotenv.config();


async function loadAndExecuteStoredProcedure() {
  try {
    // Read the SQL file
    const sqlFilePath = path.join(__dirname, 'updateCourseNameProcedure.sql');
    const sqlFileContent = fs.readFileSync(sqlFilePath, 'utf-8');

    // Execute the SQL code
    const [result, metadata] = await sequelize.query(sqlFileContent, {
      type: sequelize.QueryTypes.RAW,
    });

    // Process the result as needed
    console.log(result);
  } catch (error) {
    console.error('Error executing stored procedure:', error);
  }
}

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

    executeStoredProcedure();
    res.json({
      success: true,
      data: createdData,
      message: "Data inserted successfully",
    });
  } catch (error) {
    console.error("Error inserting data:", error);
  }


  // Call the function to execute the stored procedure
  loadAndExecuteStoredProcedure();
};
