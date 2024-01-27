const express = require("express");
const {
  getAllMahadbtProfiles,
  findMahadbtProfCount,
  totalEligibleCount,
  totalSubmitCount,
  totalSubmitCountbyCaste,
  daySubmitCount,
  // weeklySubmitCount,
  MonthlySubmitCount,
  yearlySubmitCount,
  getCourseList,
  getCourseYear,
  totalCourseAndYear,
  testEmailController,
  getIncompleteFieldsController,
  sendDatatoDB,
  personalInfo,
  addressInfo,
  otherInfo,
  currentcourseInfo,
  pastQualificationInfo,
  hostelDetailsInfo,
  testEmailBulkController,
  sendOptToStudent,
  sendEmailToStudentWithMicrositeLink,
  verifyStudentByOtpAndEmail,
  getCourseYearsFromFrontend,
} = require("../controllers/mahadbtController");

const {
  isSignedIn,
  isAdmin,
  isStudent,
  verifyToken,
} = require("../controllers/authController");
// const {
//   getUserValidationSchema,
//   // addUserValidationSchema,
//   // updateUserValidationSchema,
//   // deleteUserValidationSchema,
//   // globalRoleValidation,
//   // UsersValidationSchemaForIds,
// } = require("../helpers/validation");

const router = express.Router();

router.get("/getListAllMahadbtprofiles", isSignedIn, getAllMahadbtProfiles);
router.get("/getProfileCount", isSignedIn, findMahadbtProfCount);
router.get("/getElgCount", isSignedIn, totalEligibleCount);
router.get("/totalSubCount", isSignedIn, totalSubmitCount);
router.get("/totalsubcountbycaste", isSignedIn, totalSubmitCountbyCaste);
router.get("/dailycount", isSignedIn, daySubmitCount);
// router.get("/weeklycount", isSignedIn, weeklySubmitCount);
router.get("/monthlycount", isSignedIn, MonthlySubmitCount);
router.get("/yearlycount", isSignedIn, yearlySubmitCount);

router.get("/getcourseslist", isSignedIn, getCourseList);
// router.post("/getcoursesyear", isSignedIn, getCourseYear);
router.post("/courseandyearwisedata", isSignedIn, totalCourseAndYear);
router.post("/getIncompleteFields", getIncompleteFieldsController);

// for microsite routes for students
router.put("/submitFormData", sendDatatoDB);

router.post("/getPersonalInfo", personalInfo);
router.post("/getAddressInfo", addressInfo);
router.post("/getOtherInfo", otherInfo);
router.post("/getcurrentcourseInfo", currentcourseInfo);
router.post("/getQualificationInfo", pastQualificationInfo);
router.post("/getHostelDetailsInfo", hostelDetailsInfo);

// router.post("/sendmailbulk", testEmailBulkController);
router.post(
  "/sendemailtostudentmicrosite",
  sendEmailToStudentWithMicrositeLink
);
router.post("/sendopttostudent", sendOptToStudent);

router.post("/verifystudent", verifyToken, verifyStudentByOtpAndEmail);

router.post("/getYearsFromCourse", isSignedIn, getCourseYearsFromFrontend);

// send mail bulk mail to students

module.exports = router;
