const express = require("express");
const {
  getAllMahadbtProfiles,
  findMahadbtProfCount,
  totalEligibleCount,
  totalSubmitCount,
  totalSubmitCountbyCaste
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




module.exports = router;


