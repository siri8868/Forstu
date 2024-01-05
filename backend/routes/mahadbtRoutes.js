const express = require("express");
const {
  getAllMahadbtProfiles,
  findMahadbtProfCount,
  totalEligibleCount,
  totalSubmitCount,
  totalSubmitCountbyCaste,
  getCourseList,
  getCourseYear,
  totalCourseAndYear
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

router.get("/getListAllMahadbtprofiles", getAllMahadbtProfiles);
router.get("/getProfileCount", findMahadbtProfCount);
router.get("/getElgCount", totalEligibleCount);
router.get("/totalSubCount", totalSubmitCount);
router.get("/totalsubcountbycaste", totalSubmitCountbyCaste);

router.get("/getcourseslist", getCourseList);
router.get("/getcoursesyear", getCourseYear);
router.post("/courseandyearwisedata", totalCourseAndYear);





module.exports = router;


