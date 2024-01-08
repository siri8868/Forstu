// const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

const ROLES = require("../helpers/roles");
// const User = require("../models/usersModel");
// const collegeprofile = require("../models/collegeModel");
const Mahadbtprofiles = require("../models/mahadbtModel");

const { validationResult } = require("express-validator");
const { createHmac } = require("crypto");

const dotenv = require("dotenv");
const sequelize = require("../database/connection");
const AWS = require("aws-sdk");
const ExcelInfo = require("../models/testExcelModel");
const User = require("../models/usersModel");

// const { Json } = require("sequelize/types/utils");
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION, // For example, 'us-east-1'
});

exports.getAllMahadbtProfiles = (req, res) => {
  console.log("req profile", req.profile.ref_code);
  // console.log("hellvgrtvr");
  // res.send("dddddddd");
  Mahadbtprofiles.findAll({
    where: {
      ref_code: req.profile.ref_code,
    },
  })
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);
      res.json({
        success: true,
        data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve Mahadbt Profiles",
        error: error,
      });
    });
};

exports.findMahadbtProfCount = (req, res) => {
  console.log("req profile", req.profile.ref_code);
  console.log("hello count");
  Mahadbtprofiles.count({
    where: {
      ref_code: req.profile.ref_code,
    },
  })
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);
      res.json({
        success: true,
        data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve count of  Mahadbt Profiles",
        error: error,
      });
    });
};

exports.totalEligibleCount = (req, res) => {
  console.log("hello");
  console.log("req profile", req.profile.ref_code);
  Mahadbtprofiles.count({
    where: {
      candidate_eligible: "Yes",
      ref_code: req.profile.ref_code,
    },
  })
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);
      res.json({
        success: true,
        data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve count of  Mahadbt Profiles",
        error: error,
      });
    });
};

exports.totalSubmitCount = (req, res) => {
  console.log("req profile", req.profile.ref_code);
  console.log("hello");
  try {
    const submittedCount = Mahadbtprofiles.count({
      where: {
        application_status: "Submitted",
        ref_code: req.profile.ref_code,
      },
    });
    const pendingCount = Mahadbtprofiles.count({
      where: {
        application_status: "Pending",
      },
    });

    Promise.all([submittedCount, pendingCount])
      .then(([submittedCountData, pendingCountData]) => {
        console.log(submittedCountData);
        console.log(pendingCountData);
        // res.send("hejdjfdskj")
        res.json({
          success: true,
          data: {
            submittedCountData,
            pendingCountData,
          },
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Failed to retrieve count of  Mahadbt Profiles",
          error: error,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve count of  Mahadbt Profiles",
      error: error,
    });
  }

  // .then((data) => {
  //     console.log(data)
  //     data = JSON.stringify(data);
  //     data = JSON.parse(data);
  //     res.json({
  //       success: true,
  //       data: [
  //         submittedCount,
  //         pendingCount
  //       ],
  //     });
  //   })
  //   .catch((error) => {
  //     res.status(500).json({
  //       success: false,
  //       message: "Failed to retrieve count of  Mahadbt Profiles",
  //       error: error,
  //     });
  //   });
};

// Total submit count as per Caste
exports.totalSubmitCountbyCaste = (req, res) => {
  console.log("req profile", req.profile.ref_code);
  console.log("hellooooooo");
  try {
    Mahadbtprofiles.findAll({
      attributes: [
        "CasteCategory",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count_per_category"],
      ],
      where: {
        application_status: "submitted",
        ref_code: req.profile.ref_code,
      },
      group: ["CasteCategory"],
    })
      .then((results) => {
        const data = results.map((result) => ({
          CasteCategory: result.get("CasteCategory"),
          count_per_category: result.get("count_per_category"),
        }));

        res.json({
          success: true,
          data,
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Failed to retrieve count of Mahadbt Profiles",
          error: error.message,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve count of  Mahadbt Profiles",
      error: error,
    });
  }
};

// Get course List
exports.getCourseList = (req, res) => {
  console.log("hellooooooo from course and year");
  console.log("req profile", req.profile.ref_code);
  // console.log("requesed body", req.body)
  // const selectedCourse = req.body.courseName; // Replace with the actual user input
  // const selectedYear = req.body.courseYear;
  // res.send("course year coming ");
  Mahadbtprofiles.findAll({
    attributes: [
      [sequelize.fn("DISTINCT", sequelize.col("coursename")), "coursename"],
    ],
    where: {
      ref_code: req.profile.ref_code,
    },
    // group: ['coursename', 'current_year', 'applicationStatus']
  })
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);
      res.json({
        success: true,
        data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve Mahadbt Profiles",
        error: error,
      });
    });
};

// get Course Yer
exports.getCourseYear = (req, res) => {
  console.log("req profile", req.profile.ref_code);
  console.log("hellooooooo from course and year");
  // console.log("requesed body", req.body)
  // const selectedCourse = req.body.courseName; // Replace with the actual user input
  // const selectedYear = req.body.courseYear;
  // res.send("course year coming ");
  Mahadbtprofiles.findAll({
    attributes: [
      // 'coursename',
      // 'current_year'
      [sequelize.fn("DISTINCT", sequelize.col("current_year")), "current_year"],
    ],
    where: {
      ref_code: req.profile.ref_code,
      // coursename: selectedCourse,
      // current_year: selectedYear,
      // applicationStatus: ['pending', 'submitted']
    },
    // group: ['coursename', 'current_year', 'applicationStatus']
  })
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);
      res.json({
        success: true,
        data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve Mahadbt Profiles",
        error: error,
      });
    });
};

// select course and year route and data get persisted
exports.totalCourseAndYear = (req, res) => {
  console.log("req profile", req.profile.ref_code);
  console.log("hellooooooo from course and year");
  console.log("requested body", req.body);
  const selectedCourse = req.body.courseName; // Replace with the actual user input
  const selectedYear = req.body.courseYear;
  const whereClause = {};
  if (selectedCourse) {
    whereClause.coursename = selectedCourse;
  }
  if (selectedYear) {
    whereClause.current_year = selectedYear;
  }

  // res.send("course year coming ");
  Mahadbtprofiles.findAll({
    attributes: [
      "id",
      "candidate_name",
      "whatsapp_number",
      "email",
      "coursename",
      "current_year",
      "applicationStatus",
      "application_failed_reason",
      // [sequelize.fn('COUNT', sequelize.col('id')), 'applicationStatus']
    ],
    where: {
      // coursename: selectedCourse,
      // current_year: selectedYear,
      ref_code: req.profile.ref_code,
      ...whereClause,
      applicationStatus: ["pending", "submitted"],
    },
    // group: ['coursename', 'current_year', 'applicationStatus']
  })
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);
      res.json({
        success: true,
        data,
        message: "Data Fetched Successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve Mahadbt Profiles",
        error: error,
      });
    });
};

exports.testEmailController = (req, res) => {
  console.log("hellooooooo from course and year");
  // res.send("course year coming ");

  // Create SES service object
  const ses = new AWS.SES({ apiVersion: "2010-12-01" });

  const { to, subject, message } = req.body;

  console.log(to, subject, message);

  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: {
          Data: message,
        },
      },
      Subject: {
        Data: subject,
      },
    },
    Source: "info@forstu.com", // Replace with your verified SES email address
  };

  ses.sendEmail(params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Failed to send email");
    } else {
      console.log("Email sent:", data);
      res.status(200).send("Email sent successfully");
    }
  });
};

// exports.getIncompleteFieldsController = async (req, res) => {

//   Mahadbtprofiles.findAll({})
//     .then((data) => {
//       data = JSON.stringify(data);
//       data = JSON.parse(data);
//       res.json({
//         success: true,
//         data,
//         message: "Data Fetched Successfully",
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         success: false,
//         message: "Failed to retrieve Mahadbt Profiles",
//         error: error,
//       });
//     });
// };

// exports.getIncompleteFieldsController = async (req, res) => {
//   try {
//     const Op = require("sequelize").Op;

//     // Retrieve all columns in the table
//     const columns = Object.keys(Mahadbtprofiles.rawAttributes);

//     // Construct an OR condition for each column to check for NULL or empty string
//     const whereConditions = {
//       [Op.or]: columns.map((column) => ({
//         [column]: {
//           [Op.or]: [
//             { [Op.eq]: null }, // Check for NULL values
//             { [Op.eq]: "" }, // Check for empty string values
//           ],
//         },
//       })),
//     };

//     console.log("whereConditions", whereConditions);

//     // Find all records where at least one column has empty value
//     const incompleteFields = await Mahadbtprofiles.findAll({
//       where: whereConditions,
//     });

//     res.status(200).json({ incompleteFields });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching incomplete fields." });
//   }
// };

exports.getIncompleteFieldsController = async (req, res) => {
  // try {
  // const Op = require("sequelize").Op;
  // const columns = Object.keys(User.rawAttributes);
  // console.log("columns", columns);

  // // Constructing the WHERE clause to find null or empty values
  // const whereConditions = {
  //   [Op.or]: columns.reduce((accumulator, column) => {
  //     accumulator[column] = {
  //       [Op.or]: [{ [Op.is]: null }, { [Op.eq]: "" }],
  //     };
  //     return accumulator;
  //   }, {}),
  // };

  // const incompleteFields = await User.findAll({
  //   where: whereConditions,
  // });
  // res.status(200).json({ incompleteFields });

  const Op = require("sequelize").Op;
  const columns = Object.keys(User.rawAttributes);

  // Exclude date fields from the search for empty or null values
  const excludedFields = ["createdAt", "updatedAt"];
  const whereConditions = {
    [Op.or]: columns.reduce((accumulator, column) => {
      if (!excludedFields.includes(column)) {
        accumulator[column] = {
          [Op.or]: [{ [Op.is]: null }, { [Op.eq]: "" }],
        };
      }
      return accumulator;
    }, {}),
  };

  console.log("whereConditions", whereConditions);

  const incompleteFields = await User.findAll({
    where: whereConditions,
  });
  res.status(200).json({ incompleteFields });

  // const incompleteFields = await Mahadbtprofiles.findAll({
  //   where: whereConditions,
  // });

  // console.log("incompleteFields", incompleteFields);
  // res.send("incompleteFields");
  return;

  if (incompleteFields.length > 0) {
    res.status(200).json({ incompleteFields });
  } else {
    res
      .status(404)
      .json({ message: "No records with incomplete fields found." });
  }
};
// catch (error) {
//   // console.error("Error:", error);
//   res
//     .status(500)
//     .json("An error occurred while fetching records with incomplete fields.");
// }
// };
