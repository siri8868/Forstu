// const { Op } = require("sequelize");
const { Sequelize, Op } = require("sequelize");
const { createObjectCsvWriter } = require("csv-writer");
const ROLES = require("../helpers/roles");
const speakeasy = require("speakeasy");

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
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
const nodemailer = require("nodemailer");

// const { Json } = require("sequelize/types/utils");
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION, // For example, 'us-east-1'
});

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY, // store it in .env file to keep it safe
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_BUCKET_REGION, // this is the region that you select in AWS account
});

// Function to generate a TOTP secret
const generateTOTPSecret = () => {
  const secretObject = speakeasy.generateSecret({
    length: 20,
  });
  return secretObject;
};

// // Function to generate a TOTP token
// const generateTOTPToken = (secret) => {
//   return speakeasy.totp({
//     secret: secret.base32,
//     encoding: "base32",
//     time: 0.5, // set the time step to 15 seconds
//   });
// };

// // Function to verify a TOTP token
// const verifyTOTPToken = (secret, token) => {
//   console.log("token", token);
//   console.log("secret", secret);
//   return speakeasy.totp.verify({
//     secret: secret,
//     encoding: "base32",
//     token: token,
//     time: 0.5, // set the time step to 15 seconds
//     window: 2, // set the allowable margin for token
//     // time: 15, // specified in seconds
//   });
// };

// Function to generate a TOTP token with a 15-second step
const generateTOTPToken = (secret) => {
  return speakeasy.totp({
    secret: secret.base32,
    encoding: "base32",
    // initial_time: 1, // set the time step to 15 seconds
    initial_time: 1, // set the time step to 15 seconds
    window: 20, // set the allowable margin for token
  });
};

// Function to verify a TOTP token
// const verifyTOTPToken = (secret, token) => {
//   return speakeasy.totp.verify({
//     secret: secret,
//     encoding: "base32",
//     token: token,
//     // time: 15,
//     initial_time: 123, // specified in seconds
//     // time: Date.now(), // specify the current time for verification
//     // window: 2, // set the allowable margin for token
//   });
// };

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

// Total count as per submission date
// Daily submit count
// exports.daySubmitCount = async (req, res) => {
//   console.log("req profile", req.profile.ref_code)
//   const currentDate = new Date().toISOString().split('T')[0];

//   try {
//     const dateCount = await Mahadbtprofiles.count({
//       where: {
//         application_submission_date: currentDate,
//         ref_code: req.profile.ref_code,
//       },
//     });
//     res.json({ Date: currentDate, DateCount: dateCount });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

exports.daySubmitCount = async (req, res) => {
  try {
    // Calculate the start date for the past seven days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    // Fetch the daily count for the past seven days
    const dailyCounts = await Mahadbtprofiles.findAll({
      attributes: [
        [
          Sequelize.literal(
            "DATE_FORMAT(application_submission_date, '%d-%m-%Y')"
          ),
          "formatted_date",
        ],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "daily_count"],
      ],
      where: {
        application_submission_date: {
          [Op.gte]: startDate,
        },
      },
      group: ["formatted_date"],
      order: [[Sequelize.literal("formatted_date DESC")]],
    });

    res.json(dailyCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Weekly submit count
// exports.weeklySubmitCount = async (req, res) => {
// res.send("hii from week count");
// console.log("req profile", req.profile.ref_code)

// try {
//   const year = req.body.year;
//   const weekCount = await Mahadbtprofiles.count({
//     where: {
//       application_submission_date: {
//         [Op.between]: [`${2024}-01-01`, `${2024}-12-31`],
//       },
//       ref_code: req.profile.ref_code,
//     },
//     attributes: [
//       [Sequelize.fn('YEAR', Sequelize.col('application_submission_date')), 'Year'],
//       [Sequelize.fn('WEEK', Sequelize.col('application_submission_date')), 'Week'],
//       [Sequelize.fn('COUNT', '*'), 'WeekCount'],
//     ],
//     // group: ['Year', 'Week'],
//     // group: ['Week'],
//   });
//   // res.json(weekCount);
//   res.json({ weeklyCount: weekCount });
// } catch (error) {
//   console.error(error);
//   res.status(500).json({ error: 'Internal Server Error' });
// }
// }

// Monthly submit count
exports.MonthlySubmitCount = async (req, res) => {
  // res.send("hii from Month count");
  console.log("req profile", req.profile.ref_code);
  try {
    const year = req.params.year;
    const monthCount = await Mahadbtprofiles.count({
      where: {
        application_submission_date: {
          [Op.between]: [`${2023}-01-01`, `${2024}-12-31`],
        },
        ref_code: req.profile.ref_code,
      },
      attributes: [
        [
          Sequelize.fn("YEAR", Sequelize.col("application_submission_date")),
          "Year",
        ],
        [
          Sequelize.fn("MONTH", Sequelize.col("application_submission_date")),
          "Month",
        ],
        [Sequelize.fn("COUNT", "*"), "MonthCount"],
      ],
      group: ["Year", "Month"],
    });
    res.json({ monthCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// yearly submit count
exports.yearlySubmitCount = async (req, res) => {
  // res.send("hii from year count");
  console.log("req profile", req.profile.ref_code);
  try {
    const year = req.params.year;
    const yearCount = await Mahadbtprofiles.count({
      where: {
        application_submission_date: {
          [Op.between]: [`${2023}-01-01`, `${2024}-12-31`],
        },
        ref_code: req.profile.ref_code,
      },
      attributes: [
        [
          Sequelize.fn("YEAR", Sequelize.col("application_submission_date")),
          "Year",
        ],
        [Sequelize.fn("COUNT", "*"), "YearCount"],
      ],
      group: ["Year"],
    });
    // res.json(yearCount);
    res.json({ yearCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get course List
exports.getCourseList = (req, res) => {
  // console.log("hellooooooo from course");
  // console.log("req profile", req.profile.ref_code);
  // console.log("requesed body", req.body);
  const selectedCourse = req.body.courseName; // Replace with the actual user input
  const selectedYear = req.body.courseYear;
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
      // console.log(data);
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
  // console.log("req profile", req.profile.ref_code);
  console.log("hellooooooo from course and year");
  console.log("requesed bodyVIVIVIVIVIV>>>>", req.body);
  // return res.send("success");
  return;
  // console.log("requesed body", req.body)
  const selectedCourse = req.body.courseName; // Replace with the actual user input
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
      coursename: selectedCourse,
      // coursename: selectedCourse,
      // current_year: selectedYear,
      // applicationStatus: ['pending', 'submitted']
    },
    // group: ['coursename', 'current_year', 'applicationStatus']
  })
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);
      console.log(data);
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

exports.getStatusCountbyCoursnameAndYear = (req, res) => {
  console.log("req profile-----HEHEHEHEHEHEVIVIV", req.body);
  // res.send("hello from course count");
  const selectedCourse = req.body.courseName;
  const selectedYear = req.body.courseYear;
  console.log("coursename", selectedCourse);
  console.log("courseyear", selectedYear);
  const whereClause = {};
  if (selectedCourse) {
    whereClause.coursename = selectedCourse;
  }
  if (selectedYear) {
    whereClause.current_year = selectedYear;
  }

  Mahadbtprofiles.findAll({
    attributes: [
      "coursename",
      "current_year",
      [Sequelize.fn("COUNT", "*"), "total_count"],
      [
        Sequelize.fn(
          "SUM",
          Sequelize.literal(
            "CASE WHEN application_status = 'submitted' THEN 1 ELSE 0 END"
          )
        ),
        "submitted_count",
      ],
      [
        Sequelize.fn(
          "SUM",
          Sequelize.literal(
            "CASE WHEN application_status = 'pending' THEN 1 ELSE 0 END"
          )
        ),
        "pending_count",
      ],
    ],
    where: {
      // ref_code: req.profile.ref_code,
      // ...whereClause,
      // coursename: selectedCourse,
      // current_year: selectedYear,
      ref_code: req.profile.ref_code,
      ...whereClause,
    },
    // group: ["current_year", "application_status"],
    group: ["coursename", "current_year"],
  })
    .then((data) => {
      console.log(data);
      res.json({
        success: true,
        data,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve Mahadbt Profiles",
        error: error,
      });
    });
};

// exports.testEmailController = async (req, res) => {
//   console.log("hellooooooo from course and year");
//   // res.send("course year coming ");

//   // Create SES service object
//   const ses = new AWS.SES({ apiVersion: "2010-12-01" });

//   const { to, subject, message } = req.body;

//   console.log(to, subject, message);

//   const params = {
//     Destination: {
//       ToAddresses: [to],
//     },
//     Message: {
//       Body: {
//         Text: {
//           Data: message,
//         },
//       },
//       Subject: {
//         Data: subject,
//       },
//     },
//     Source: "info@forstu.co", // Replace with your verified SES email address
//   };

//   ses.sendEmail(params, (err, data) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send("Failed to send email");
//     } else {
//       console.log("Email sent:", data);
//       res.status(200).send("Email sent successfully");
//     }
//   });
// };

// Check if the "to" email address is verified
// try {
//   await verifyEmail(ses, to);
// } catch (error) {
//   console.error(error);
//   return res.status(400).send("Email address is not verified");
// }

// Function to verify an email address
// async function verifyEmail(ses, email) {
//   const params = {
//     EmailAddress: email,
//   };

//   return new Promise((resolve, reject) => {
//     ses.verifyEmailAddress(params, (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         console.log(`Email address ${email} verified successfully`);
//         resolve(data);
//       }
//     });
//   });
// }

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
  const columns = Object.keys(Mahadbtprofiles.rawAttributes);
  // console.log("columns", columns);

  // res.status(200).json({ columns });
  // return;

  // Exclude date fields from the search for empty or null values
  // const excludedFields = ["createdAt", "updatedAt"];
  // const excludedFields = ["dob", "Candidate_name", "gender", "alternate_mobile_number", "whatsapp_number", "parent_mobile_number", "marital_status", "religion", "CasteCategory", "SubCaste", "do_you_have_caste_certificate", "caste_certificate_number", "caste_issued_district", "caste_applicantName", "caste_Iss_Authority", "caste_doc", "caste_issued_date", "annual_family_income", "do_you_have_income_certificate", "income_cert_no", "income_Iss_Authority", "income_doc", "income_issued_date", "do_you_have_Domicile_maharashtra_karnataka", "do_you_have_domicile_certificate", "domicile_relation_type", "domicilecertnumber", "domicile_applicant_name", "domicile_issued_authority", "domicile_doc", "domicile_issued_date", "do_you_have_disability", "disability_type", "disability_name", "do_you_have_disability_certificate", "disability_certificate_no", "disability_percentage", "disability_issued_date", "disability_issuing_authority", "disabilty_doc", "bankacc_name", "bank_ifsc", "permanent_village", "Correspo_Address_same_as_permanent_address", "correspondance_district", "correspondance_taluka", "correspondance_address", "correspondance_state", "correspondance_village", "correspondance_pincode", "is_father_alive"];
  const excludedFields = [
    // "id",
    // "candidateName",
    // "gender",
    "dob",
    // "alternateMobileNumber",
    // "whatsappNumber",
    // "parentMobileNumber",
    // "maritalStatus",
    // "religion",
    // "casteCategory",
    // "subCaste",
    // "doYouHaveCasteCertificate",
    // "casteCertificateNumber",
    // "casteIssuedDistrict",
    // "casteApplicantName",
    // "casteIssuingAuthority",
    // "casteDoc",
    "casteIssuedDate",
    // "annualFamilyIncome",
    // "doYouHaveIncomeCertificate",
    // "incomeCertNo",
    // "incomeIssAuthority",
    // "incomeDoc",
    "incomeIssuedDate",
    // "doYouHaveDomicileMaharashtraKarnataka",
    // "doYouHaveDomicileCertificate",
    // "domicileRelationType",
    // "domicileCertNumber",
    // "domicileApplicantName",
    // "domicileIssuedAuthority",
    // "domicileDoc",
    "domicileIssuedDate",
    // "doYouHaveDisability",
    // "disabilityType",
    // "disabilityName",
    // "doYouHaveDisabilityCertificate",
    // "disabilityCertificateNo",
    // "disabilityPercentage",
    "disabilityIssuedDate",
    // "disabilityIssuingAuthority",
    // "disabilityDoc",
    // "bankaccName",
    // "bankIfsc",
    // "permanentVillage",
    // "correspoAddressSameAsPermanent",
    // "correspondanceDistrict",
    // "correspondanceTaluka",
    // "correspondanceAddress",
    // "correspondanceState",
    // "correspondanceVillage",
    // "correspondancePincode",
    // "isFatherAlive",
    // "fatherName",
    // "fatherOccupation",
    // "fatherSalaried",
    // "motherAlive",
    // "motherName",
    // "motherOccupation",
    // "isMotherSalaried",
    // "guardianName",
    // "guardianAddress",
    // "guardianOccupation",
    // "isGuardianSalaried",
    // "guardianRelationType",
    // "guardianCertificateDoc",
    // "admissionYear",
    // "instituteState",
    // "instituteDistrict",
    // "instituteTaluka",
    // "qualificationLevel",
    // "courseStream",
    // "instituteName",
    // "coursename",
    // "admissionType",
    // "cetPercentAge",
    // "admissionApplicationId",
    // "admissionLetterDoc",
    // "currentYear",
    // "isCompletedPursuing",
    "admissionDate",
    // "feesPaid",
    // "feeReceiptDoc",
    // "admissionCategory",
    // "modeStudy",
    // "class10Qualification",
    // "class10Stream",
    // "class10State",
    // "class10District",
    // "class10Taluka",
    // "class10Course",
    // "class10Board",
    // "class10Mode",
    // "class10AdmissionYear",
    // "class10PassingYear",
    // "class10Result",
    // "class10Percentage",
    // "class10Attempt",
    // "class10Doc",
    // "class10SeatNumber",
    // "class10MonthOfExam",
    // "class10MarksObtained",
    // "class10Attempts",
    // "class12QualificationLevel",
    // "class12Stream",
    // "class12InstituteState",
    // "class12InstituteDistrict",
    // "class12Taluka",
    // "class12CollegeName",
    // "class12Course",
    // "class12Board",
    // "class12SeatNumber",
    // "class12Mode",
    // "class12AdmissionYear",
    // "class12PassingYear",
    // "class12Result",
    // "class12Percentage",
    // "class12Attempts",
    // "class12Doc",
    // "doYouHaveGap",
    // "gapYear",
    // "gapDoc",
    // "areYouHostellerDayScholar",
    // "hostelState",
    // "hostelDistrict",
    // "hostelTaluka",
    // "hostelType",
    // "hostelName",
    // "hostelAddress",
    // "hostelPincode",
    "hostelAdmissionDate",
    // "hostelDoc",
    // "candidateEligible",
    "applicationSubmissionDate",
    // "applicationFailedReason",
    // "applicationStatus",
    // "eligibleScheme1",
    // "email",
    // "mahadbt_username",
    // "mahadbt_password",
    // "ref_code",
    "createdAt",
    "updatedAt",
  ];

  console.log("excludedFields", excludedFields.length);
  // res.send("helllll000");
  // return;
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

  const incompleteFields = await Mahadbtprofiles.findAll({
    where: {
      [Op.and]: [
        { [Op.or]: whereConditions[Op.or] }, // Incorporating the dynamic conditions
        { email: req.body.email }, // Adding the email condition
      ],
    },
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

exports.sendDatatoDB = async (req, res) => {
  // console.log("success");
  // res.send("Data send to db");
  // console.log("req profile", req.profile.ref_code);
  // const { id } = req.body.id;
  // console.log("req body", req.body);
  // console.log("req body ID:::::", req.body.id);

  // return res.send("success");

  // const savedData = {
  //   candidateName: "nishantttt",
  //   whatsappNumber: 9999999999,
  //   gender: "Female",
  //   parentMobileNumber: 888888888888,
  //   maritalStatus: "Unmarried",
  //   religion: "Hindu",
  //   casteCategory: "SBC",
  //   subCaste: "PADMASHALI",
  //   doYouHaveCasteCertificate: "Yes",
  //   casteCertificateNumber: 9999090099099,
  // };

  Mahadbtprofiles.update(req.body, {
    // Specify the condition for the update
    where: {
      id: req.body.id,
    },
  })
    .then((result) => {
      console.log("result", result);
      // The result is an array where the first element is the number of updated rows
      // console.log(`${result[0]} row(s) updated`);
      // res.status(200).json({ message: ` row(s) updated` });
      return res.status(200).json({
        success: true,
        message: `${result[0]} row(s) updated`,
      });
    })
    .catch((error) => {
      console.error("Error updating records:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.sendCasteDocumentToS3 = async (req, res) => {
  // console.log("req profile", req.files);
  // return res.send("success");
  // const dataOfMain = req.body;
  // console.log("req body id", req.body);
  // return;
  try {
    const file = req.files.video;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${file.name}`,
      Body: file.data,
    };
    const data = s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      casteDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);
    // return res.status(200).json({
    //   success: true,
    //   message: "File uploaded to S3",
    //   data: objectUrl,
    // });
    // Update database entry
    await Mahadbtprofiles.update(updatedDataOfMain, {
      where: {
        id: req.body.id,
      },
    });

    res.status(200).json({
      success: true,
      message: `${objectUrl} file(s) uploaded to S3 and database entry updated successfully.`,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  //   res.status(200).json({
  //     success: true,
  //     message: "File uploaded to S3",
  //     data: objectUrl,
  //   });
  // } catch (error) {
  //   console.error("Error:", error);
  //   res.status(500).json({ error: "Internal Server Error" });
  // }
  // const uploadedObjectUrls = await Promise.all(s3UploadPromises);
};

// exports.sendDatatoDB = async (req, res) => {
//   try {
//     // let files = req.files.video;
//     // let files = [...req.files.video, ...req.files.incomeDocumentFile];
//     const dataOfMain = req.body;
//     // console.log("Caste Certificateee", req.files.video);
//     // console.log("incomeDocumentFile:::", req.files.incomeDocumentFile);

//     // console.log("dataOfMain", req.body);

//     let files = [];
//     if (req?.files?.video) {
//       if (Array.isArray(req?.files?.video)) {
//         files.push(...req?.files?.video);
//       } else {
//         files.push(req?.files?.video);
//       }
//     }

//     if (req?.files?.incomeDocumentFile) {
//       if (Array.isArray(req?.files?.incomeDocumentFile)) {
//         files.push(...req?.files?.incomeDocumentFile);
//       } else {
//         files.push(req?.files?.incomeDocumentFile);
//       }
//     }

//     if (req?.files?.domicileDocumentFile) {
//       if (Array.isArray(req?.files?.domicileDocumentFile)) {
//         files.push(...req?.files?.domicileDocumentFile);
//       } else {
//         files.push(req?.files?.domicileDocumentFile);
//       }
//     }

//     // Upload files to S3
//     const s3UploadPromises = files.map((file) => {
//       console.log("file", file);
//       const uploadParams = {
//         Bucket: "mahadbtdocs",
//         Key: `${file.name}`,
//         Body: file.data,
//       };
//       // return s3.upload(uploadParams).promise();
//       const data = s3.send(new PutObjectCommand(uploadParams));

//       // Construct the URL of the uploaded object manually
//       const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

//       return objectUrl; // Return the URL of the uploaded object
//     });

//     const uploadedObjectUrls = await Promise.all(s3UploadPromises);

//     let casteDocUrl, incomeDocUrl, domicileDocUrl;

//     uploadedObjectUrls.forEach((url) => {
//       const lowercaseUrl = url.toLowerCase();
//       if (lowercaseUrl.includes("caste.")) {
//         casteDocUrl = url;
//       } else if (lowercaseUrl.includes("income.")) {
//         incomeDocUrl = url;
//       } else if (lowercaseUrl.includes("domicile.")) {
//         domicileDocUrl = url;
//       } else {
//         // Handle other types of documents if needed
//         console.log("Other type of document:", url);
//         // return res.status(422).json({
//         //   // error: "Invalid file type",
//         //   success: false,
//         //   message: "Invalid file name",
//         // });
//       }
//     });

//     const updatedDataOfMain = {
//       ...dataOfMain,
//       casteDoc: casteDocUrl || dataOfMain.casteDoc,
//       incomeDoc: incomeDocUrl || dataOfMain.incomeDoc,
//       domicileDoc: domicileDocUrl || dataOfMain.domicileDoc,
//     };

//     // const updatedDataOfMain = {
//     //   ...dataOfMain,
//     //   casteDoc: uploadedObjectUrls[0]
//     //     ? uploadedObjectUrls[0]
//     //     : uploadedObjectUrls[0],
//     //   incomeDoc: uploadedObjectUrls[1]
//     //     ? uploadedObjectUrls[1]
//     //     : uploadedObjectUrls[0],
//     //   domicileDoc: uploadedObjectUrls[2]
//     //     ? uploadedObjectUrls[2]
//     //     : uploadedObjectUrls[0],
//     // };

//     // const updatedDataOfMain = {
//     //   ...dataOfMain,
//     //   casteDoc: uploadedObjectUrls[0],
//     //   incomeDoc: uploadedObjectUrls[1],
//     //   domicileDoc: uploadedObjectUrls[2],
//     // };
//     // const updatedDataOfMain = {
//     //   ...dataOfMain,
//     //   casteDoc: null,
//     //   incomeDoc: null,
//     //   domicileDoc: null,
//     // };
//     console.log("S3 Upload updatedDataOfMain>>>>>>:", updatedDataOfMain);
//     console.log("S3 Upload Responses:", uploadedObjectUrls);

//     // return;

//     // Update database entry
//     await Mahadbtprofiles.update(updatedDataOfMain, {
//       where: {
//         id: req.body.id,
//       },
//     });

//     res.status(200).json({
//       success: true,
//       message: `${uploadedObjectUrls.length} file(s) uploaded to S3 and database entry updated successfully.`,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

exports.personalInfo = (req, res) => {
  // res.send("Hello from personal info");
  // console.log("ypur e-mail", req.profile.email);
  console.log("req:", req.body.email);
  // return;

  Mahadbtprofiles.findAll({
    attributes: [
      "id",
      "candidateName",
      "email",
      "gender",
      "dob",
      "alternateMobileNumber",
      "whatsappNumber",
      "parentMobileNumber",
      "maritalStatus",
      "religion",
      "casteCategory",
      "subCaste",
      "doYouHaveCasteCertificate",
      "casteCertificateNumber",
      "casteIssuedDistrict",
      "casteApplicantName",
      "casteIssuingAuthority",
      "casteDoc",
      "casteIssuedDate",
      "annualFamilyIncome",
      "doYouHaveIncomeCertificate",
      "incomeCertNo",
      "incomeIssAuthority",
      "incomeDoc",
      "incomeIssuedDate",
      "doYouHaveDomicileMaharashtraKarnataka",
      "doYouHaveDomicileCertificate",
      "domicileRelationType",
      "domicileCertNumber",
      "domicileApplicantName",
      "domicileIssuedAuthority",
      "domicileDoc",
      "domicileIssuedDate",
      "doYouHaveDisability",
      "disabilityType",
      "disabilityName",
      "doYouHaveDisabilityCertificate",
      "disabilityCertificateNo",
      "disabilityPercentage",
      "disabilityIssuedDate",
      "disabilityIssuingAuthority",
      "disabilityDoc",
      "disabilityIssuedDate",
      "bankaccName",
      "bankIfsc",
    ],
    where: {
      // id: req.body.id,
      // // ref_code: req.profile.ref_code,
      email: req.body.email,
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

exports.addressInfo = (req, res) => {
  // res.send("Hello from address info");
  Mahadbtprofiles.findAll({
    attributes: [
      "id",
      "permanentVillage",
      "correspoAddressSameAsPermanent",
      "correspondanceDistrict",
      "correspondanceTaluka",
      "correspondanceAddress",
      "correspondanceState",
      "correspondanceVillage",
      "correspondancePincode",
    ],
    where: {
      email: req.body.email,
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

exports.otherInfo = (req, res) => {
  console.log("ypur e-mail", req.body.email);
  Mahadbtprofiles.findAll({
    attributes: [
      "id",
      "isFatherAlive",
      "fatherName",
      "fatherOccupation",
      "fatherSalaried",
      "motherAlive",
      "motherName",
      "motherOccupation",
      "isMotherSalaried",
      "guardianName",
      "guardianAddress",
      "guardianOccupation",
      "isGuardianSalaried",
      "guardianRelationType",
      "guardianCertificateDoc",
    ],
    where: {
      email: req.body.email,
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

exports.currentcourseInfo = (req, res) => {
  // res.send("Hello from current course info");
  Mahadbtprofiles.findAll({
    attributes: [
      "id",
      "admissionYear",
      "instituteState",
      "instituteDistrict",
      "instituteTaluka",
      "qualificationLevel",
      "courseStream",
      "instituteName",
      "coursename",
      "admissionType",
      "cetPercentAge",
      "admissionApplicationId",
      "admissionLetterDoc",
      "currentYear",
      "isCompletedPursuing",
      "admissionDate",
      "feesPaid",
      "feeReceiptDoc",
      "admissionCategory",
      "modeStudy",
    ],
    where: {
      email: req.body.email,
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

exports.pastQualificationInfo = (req, res) => {
  // res.send("Hello from past qaulification info");
  Mahadbtprofiles.findAll({
    attributes: [
      "id",
      "class10Qualification",
      "class10Stream",
      "class10State",
      "class10District",
      "class10Taluka",
      "class10Course",
      "class10Board",
      "class10Mode",
      "class10AdmissionYear",
      "class10PassingYear",
      "class10Result",
      "class10Percentage",
      "class10Attempt",
      "class10Doc",
      "class10SeatNumber",
      "class10MonthOfExam",
      "class10MarksObtained",
      "class10Attempts",
      "class12QualificationLevel",
      "class12Stream",
      "class12InstituteState",
      "class12InstituteDistrict",
      "class12Taluka",
      "class12CollegeName",
      "class12Course",
      "class12Board",
      "class12SeatNumber",
      "class12Mode",
      "class12AdmissionYear",
      "class12PassingYear",
      "class12Result",
      "class12Percentage",
      "class12Attempts",
      "class12Doc",
      "doYouHaveGap",
      "gapYear",
      "gapDoc",
    ],
    where: {
      email: req.body.email,
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

exports.hostelDetailsInfo = (req, res) => {
  Mahadbtprofiles.findAll({
    attributes: [
      "id",
      "areYouHostellerDayScholar",
      "hostelState",
      "hostelDistrict",
      "hostelTaluka",
      "hostelType",
      "hostelName",
      "hostelAddress",
      "hostelPincode",
      "hostelAdmissionDate",
      "hostelDoc",
    ],
    where: {
      email: req.body.email,
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

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vivek.gundu29@gmail.com",
    pass: "dusn ulfg oter yfxa",
  },
});

// exports.testEmailBulkController = async (req, res) => {
//   const { toList, subject, text } = req.body;

//   console.log(toList, subject, text);
//   // res.send("success");
//   // return;

//   // const mailOptions = {
//   //   from: "vivek.gundu29@gmail.com",
//   //   to,
//   //   subject,
//   //   text,
//   // };

//   // transporter.sendMail(mailOptions, (error, info) => {
//   //   if (error) {
//   //     return res.status(500).send(error.toString());
//   //   }

//   //   console.log("Email sent: " + info.response);
//   //   res.status(200).send("Email sent: " + info.response);
//   // });

//   if (!toList || !Array.isArray(toList) || toList.length === 0) {
//     return res.status(400).send("Invalid recipient list");
//   }

//   const emailPromises = toList.map(async (to) => {
//     const mailOptions = {
//       from: "vivek.gundu29@gmail.com",
//       to,
//       subject,
//       text,
//     };

//     try {
//       const info = await transporter.sendMail(mailOptions);
//       console.log("Email sent to " + to + ": " + info.response);
//       return "Email sent to " + to + ": " + info.response;
//     } catch (error) {
//       console.error("Error sending email to " + to + ": " + error.toString());
//       return "Error sending email to " + to + ": " + error.toString();
//     }
//   });

//   try {
//     const results = await Promise.all(emailPromises);
//     res.status(200).send(results);
//   } catch (error) {
//     res.status(500).send("Error sending bulk emails: " + error.toString());
//   }
// };

exports.sendEmailToStudentWithMicrositeLink = async (req, res) => {
  console.log("sending bulk email to students with microsite link");

  // Create SES service object
  const ses = new AWS.SES({ apiVersion: "2010-12-01" });

  const { to, subject, message } = req.body;

  // console.log(to, subject, message);

  // Split the 'to' string into an array of email addresses
  const toAddresses = Array.isArray(to) ? to : [to];

  console.log("toAddresses", toAddresses);

  // Create an array to store promises for each email sent
  const emailPromises = [];

  // Iterate through each email address and send the email
  toAddresses.forEach((email) => {
    const params = {
      Destination: {
        ToAddresses: [email],
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
      Source: "info@forstu.co", // Replace with your verified SES email address
    };

    // Create a promise for each SES email sending operation
    const emailPromise = new Promise((resolve, reject) => {
      ses.sendEmail(params, (err, data) => {
        if (err) {
          console.error(err);
          reject(`Failed to send email to ${email}`);
        } else {
          console.log(`Email sent to ${email}:`, data);
          resolve(`Email sent to ${email} successfully`);
        }
      });
    });

    emailPromises.push(emailPromise);
  });

  try {
    // Wait for all email promises to resolve
    await Promise.all(emailPromises);
    // res.status(200).send("Emails sent successfully");
    return res.status(200).json({
      status: true,
      message: "Emails sent successfully",
    });
  } catch (error) {
    console.error(error);
    // res.status(500).send("Failed to send one or more emails");
    return res.status(400).json({
      status: false,
      message: "Failed to send one or more emails",
    });
  }
};

exports.sendOptToStudent = async (req, res) => {
  const secret = generateTOTPSecret();

  const generatedToken = generateTOTPToken(secret);

  console.log("secret secret:::::::", secret);
  console.log("Generated Token:::::::", generatedToken);

  const ses = new AWS.SES({ apiVersion: "2010-12-01" });

  const to = req.body[0];
  console.log("diapkkkkkkkkkkkkk", req.body[0]);

  // console.log(to, subject, message);

  // Split the 'to' string into an array of email addresses
  const toAddresses = Array.isArray(to) ? to : [to];

  console.log("toAddresses", toAddresses);

  // Create an array to store promises for each email sent
  const emailPromises = [];

  // Iterate through each email address and send the email
  toAddresses.forEach((email) => {
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Text: {
            Data: `OTP IS - ${generatedToken} `,
          },
        },
        Subject: {
          Data: "OTP for verification",
        },
      },
      Source: "info@forstu.co", // Replace with your verified SES email address
    };

    // Create a promise for each SES email sending operation
    const emailPromise = new Promise((resolve, reject) => {
      ses.sendEmail(params, (err, data) => {
        if (err) {
          console.error(err);
          reject(`Failed to send email to ${email}`);
        } else {
          console.log(`Email sent to ${email}:`, data);
          resolve(`Email sent to ${email} successfully`);
        }
      });
    });

    emailPromises.push(emailPromise);
  });

  try {
    // Wait for all email promises to resolve
    await Promise.all(emailPromises);
    return res.status(200).json({
      success: true,
      message: "OTP sent your mail.",
      data: { secret, generatedToken, to },
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      status: false,
      message: "Failed to send OTP",
    });
  }
};

exports.verifyStudentByOtpAndEmail = async (req, res) => {
  try {
    // const isTokenValid = verifyTOTPToken(secret, generatedToken);
    // console.log("isTokenValid", isTokenValid);
    console.log("I AM HERERERE NOWWWW!!!");
    res.json({
      success: true,
      message: "Successfully Signed In!",
    });
  } catch (error) {
    return res.status(400).json({
      success: true,
      message: "Failed to verify!",
    });
  }
};

exports.getCourseYearsFromFrontend = async (req, res) => {
  console.log("req body", req.body);

  // console.log("requesed body", req.body)
  const selectedCourse = req.body.courseName; // Replace with the actual user input
  // const selectedYear = req.body.courseYear;
  console.log("selectedCourse", selectedCourse);
  // res.send("course year coming ");
  Mahadbtprofiles.findAll({
    attributes: [
      // 'coursename',
      // 'current_year'
      [sequelize.fn("DISTINCT", sequelize.col("current_year")), "current_year"],
    ],
    where: {
      ref_code: req.profile.ref_code,
      coursename: selectedCourse,
      // coursename: selectedCourse,
      // current_year: selectedYear,
      // applicationStatus: ['pending', 'submitted']
    },
    // group: ['coursename', 'current_year', 'applicationStatus']
  })
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);
      console.log(data);
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

  // res.json({
  //   success: true,
  //   message: "Successfully",
  // });
};

// Get Emails of studets whose profiles are incomplete for sending them email
exports.getEmailsOfPendingStduents = async (req, res) => {
  // res.send("hiii from email");
  console.log("req profile", req.profile.ref_code);
  // console.log("hellvgrtvr");
  // res.send("dddddddd");
  Mahadbtprofiles.findAll({
    attributes: ["id", "email", "application_status"],
    where: {
      ref_code: req.profile.ref_code,
      application_status: "Pending",
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

// For viewing details after excel uploaded
exports.getStudentsView = async (req, res) => {
  // res.send("hiii from email");
  console.log("req profile", req.profile.ref_code);
  // console.log("hellvgrtvr");
  // res.send("dddddddd");
  Mahadbtprofiles.findAll({
    attributes: [
      "id",
      "candidate_name",
      "coursename",
      "current_year",
      // "application_status"
    ],
    where: {
      ref_code: req.profile.ref_code,
      //   application_status: "Pending",
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

exports.flushdata = async (req, res) => {
  // res.send("heiiiiiiii flush data");
  // console.log("req profile", req.profile.ref_code);
  // console.log("hellvgrtvr");
  // res.send("dddddddd");
  Mahadbtprofiles.truncate()
    .then(() => {
      res.json({
        success: true,
        message: "Mahadbt Profiles truncated successfully.",
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Failed to truncate Mahadbt Profiles",
        error: error,
      });
    });
};

// exports.getSingleMahadbtProfile = (req, res) => {
//   console.log("id:::::", req.body);
//   res.send("success");
//   return;

//   // console.log("uour email", req.profile.email);
//   // console.log("hellvgrtvr");
//   // res.send("dddddddd");
//   Mahadbtprofiles.findOne({
//     where: {
//       // ref_code: req.profile.ref_code,
//       // email: req.profile.email,
//       id: req.body.id,
//     },
//   })
//     .then((data) => {
//       data = JSON.stringify(data);
//       data = JSON.parse(data);
//       res.json({
//         success: true,
//         data,
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

exports.getSingleMahadbtProfileByRefCode = (req, res) => {
  // console.log("id:::::", req.body);
  // console.log("clicked on single profile");
  // res.json({
  //   success: true,
  // });
  // return;

  // console.log("uour email", req.profile.email);
  // console.log("hellvgrtvr");
  // res.send("dddddddd");
  Mahadbtprofiles.findOne({
    where: {
      // ref_code: req.profile.ref_code,
      // email: req.profile.email,
      id: req.body.id,
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

// Download CSV FIle

exports.downloadCSVFileforApplicationStatus = async (req, res) => {
  console.log("req profile", req.profile.ref_code);

  try {
    const data = await Mahadbtprofiles.findAll({
      attributes: [
        "id",
        "Candidate_name",
        "whatsapp_number",
        "qualification_level",
        "coursename",
        "current_year",
        "course_stream",
        "application_status",
        "ref_code",
      ],
      where: {
        [Op.or]: [
          { application_status: "Submitted" },
          { application_status: "Pending" },
        ],
        ref_code: req.profile.ref_code,
      },
      order: [["application_status", "ASC"]],
    });

    const csvWriter = createObjectCsvWriter({
      path: "application_status_data.csv", // You can customize the file name
      header: [
        { id: "id", title: "ID" },
        { id: "Candidate_name", title: "Candidate Name" },
        { id: "whatsapp_number", title: "WhatsApp Number" },
        { id: "qualification_level", title: "Qualification Level" },
        { id: "coursename", title: "Course Name" },
        { id: "current_year", title: "Current Year" },
        { id: "course_stream", title: "Course Stream" },
        { id: "application_status", title: "Application Status" },
        { id: "ref_code", title: "Reference Code" },
      ],
    });

    const records = data.map((row) => row.get({ plain: true })); // Convert Sequelize instances to plain objects

    csvWriter
      .writeRecords(records)
      .then(() => {
        console.log("CSV file written successfully");
        res.download("application_status_data.csv");
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Failed to write CSV file",
          error: error,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Mahadbt Profiles",
      error: error,
    });
  }
};

exports.downloadCSVFileforCasteWiseApplication = async (req, res) => {
  console.log("req profile", req.profile.ref_code);

  try {
    const data = await Mahadbtprofiles.findAll({
      attributes: [
        "id",
        "Candidate_name",
        "whatsapp_number",
        "CasteCategory",
        "qualification_level",
        "coursename",
        "current_year",
        "course_stream",
        "application_status",
        "ref_code",
      ],
      where: {
        application_status: "Pending",
        ref_code: req.profile.ref_code,
      },
      order: [["CasteCategory", "ASC"]],
    });

    const csvWriter = createObjectCsvWriter({
      path: "caste_wise_applications.csv", // You can customize the file name
      header: [
        { id: "id", title: "ID" },
        { id: "Candidate_name", title: "Candidate Name" },
        { id: "whatsapp_number", title: "WhatsApp Number" },
        { id: "CasteCategory", title: "Caste Category" },
        { id: "qualification_level", title: "Qualification Level" },
        { id: "coursename", title: "Course Name" },
        { id: "current_year", title: "Current Year" },
        { id: "course_stream", title: "Course Stream" },
        { id: "application_status", title: "Application Status" },
        { id: "ref_code", title: "Reference Code" },
      ],
    });

    const records = data.map((row) => row.get({ plain: true })); // Convert Sequelize instances to plain objects

    csvWriter
      .writeRecords(records)
      .then(() => {
        console.log("CSV file written successfully");
        res.download("caste_wise_applications.csv");
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Failed to write CSV file",
          error: error,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Mahadbt Profiles",
      error: error,
    });
  }
};

exports.downloadCSVFileforPendingReason = async (req, res) => {
  console.log("req profile", req.profile.ref_code);

  try {
    const data = await Mahadbtprofiles.findAll({
      attributes: [
        "id",
        "Candidate_name",
        "whatsapp_number",
        "CasteCategory",
        "application_status",
        "qualification_level",
        "coursename",
        "current_year",
        "course_stream",
        "application_failed_reason",
        "ref_code",
      ],
      where: {
        application_status: "Pending",
        ref_code: req.profile.ref_code,
      },
      order: [["application_failed_reason", "ASC"]],
    });

    const csvWriter = createObjectCsvWriter({
      path: "pending_reason.csv", // You can customize the file name
      header: [
        { id: "id", title: "ID" },
        { id: "Candidate_name", title: "Candidate Name" },
        { id: "whatsapp_number", title: "WhatsApp Number" },
        { id: "CasteCategory", title: "Caste Category" },
        { id: "application_status", title: "Application Status" },
        { id: "qualification_level", title: "Qualification Level" },
        { id: "coursename", title: "Course Name" },
        { id: "current_year", title: "Current Year" },
        { id: "course_stream", title: "Course Stream" },
        { id: "application_failed_reason", title: "Applicaton Failed Reason" },

        // Add other columns based on your attributes
      ],
    });

    const records = data.map((row) => row.get({ plain: true })); // Convert Sequelize instances to plain objects

    csvWriter
      .writeRecords(records)
      .then(() => {
        console.log("CSV file written successfully");
        res.download("pending_reason.csv");
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Failed to write CSV file",
          error: error,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Mahadbt Profiles",
      error: error,
    });
  }
};
