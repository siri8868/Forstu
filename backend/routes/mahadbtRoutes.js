const express = require("express");
const {
  getAllMahadbtProfiles,
  findMahadbtProfCount,
  totalEligibleCount,
  totalSubmitCount,
  totalSubmitCountbyCaste,
  getCourseList,
  getCourseYear,
  totalCourseAndYear,
  testEmailController,
} = require("../controllers/mahadbtController");

const { isSignedIn, isAdmin } = require("../controllers/authController");
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

router.get("/getcourseslist", isSignedIn, getCourseList);
router.get("/getcoursesyear", isSignedIn, getCourseYear);
router.post("/courseandyearwisedata", isSignedIn, totalCourseAndYear);
router.post("/sendmailtest", isSignedIn, testEmailController);

module.exports = router;
